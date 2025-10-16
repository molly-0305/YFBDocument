import fs from 'fs-extra';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const docsDir = path.join(process.cwd(), 'docs'); // docs目录
const outputFile = path.join(process.cwd(), 'docsData.json');

async function parseMarkdownFile(filePath) {
  const content = await fs.readFile(filePath, 'utf-8');
  const { data, content: mdContent } = matter(content);

  const processedContent = await remark().use(html).process(mdContent);
  const htmlContent = processedContent.toString();

  // 调试输出
  console.log('解析文件:', filePath);
  console.log('Markdown 原文长度:', mdContent.length);
  console.log('解析后的 HTML 长度:', htmlContent.length);

  return {
    objectID: path.relative(docsDir, filePath).replace(/\\/g, '/'), // 子目录也能唯一
    title: data.title || path.basename(filePath, path.extname(filePath)),
    content: htmlContent,
    url: `/docs/${path.relative(docsDir, filePath).replace(/\\/g, '/').replace(path.extname(filePath), '')}`
  };
}

// 递归遍历 docs 目录
async function getAllMarkdownFiles(dir) {
  let results = [];
  const files = await fs.readdir(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = await fs.stat(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(await getAllMarkdownFiles(fullPath));
    } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
      results.push(fullPath);
    }
  }
  return results;
}

async function generateJSON() {
  const mdFiles = await getAllMarkdownFiles(docsDir);
  console.log('找到 Markdown 文件:', mdFiles);

  const docsData = [];
  for (const file of mdFiles) {
    const doc = await parseMarkdownFile(file);
    docsData.push(doc);
  }

  await fs.writeJson(outputFile, docsData, { spaces: 2 });
  console.log(`成功生成 JSON 文件: ${outputFile}`);
}

generateJSON().catch(err => console.error(err));
