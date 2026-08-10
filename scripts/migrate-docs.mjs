/**
 * Migrate docs MDX files to public/content Markdown
 * Also writes nav.json, search-index.json, and copies static/img
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DOCS = path.join(ROOT, 'docs');
const STATIC_IMG = path.join(ROOT, 'static', 'img');
const OUT = path.join(ROOT, 'public', 'content');
const ASSETS = path.join(OUT, 'assets', 'img');
const BASE = '/YFBDocument';

const SECTIONS = [
  { id: 'softwareInstall', label: '软件安装', dir: 'softwareInstall' },
  { id: 'userGuide', label: '使用手册', dir: 'userGuide' },
  { id: 'knowledgeBase', label: '知识库', dir: 'knowledgeBase' },
  { id: 'update', label: '更新', dir: 'update' },
  { id: 'technicalsupport', label: '技术支持', dir: 'technicalsupport' },
];

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return null;
  }
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  ensureDir(dest);
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

function camelToKebab(key) {
  const map = {
    maxWidth: 'max-width',
    marginLeft: 'margin-left',
    marginRight: 'margin-right',
    marginTop: 'margin-top',
    marginBottom: 'margin-bottom',
    fontSize: 'font-size',
    fontWeight: 'font-weight',
    textAlign: 'text-align',
    lineHeight: 'line-height',
    backgroundColor: 'background-color',
    whiteSpace: 'white-space',
  };
  return map[key] || key;
}

function convertMdx(text) {
  let title = null;
  let position = 999;
  const fm = text.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);
  if (fm) {
    const tm = fm[1].match(/^title:\s*(.+)$/m);
    if (tm) title = tm[1].trim().replace(/^["']|["']$/g, '');
    const pm = fm[1].match(/^sidebar_position:\s*(\d+)/m);
    if (pm) position = Number(pm[1]);
    text = text.slice(fm[0].length);
  }

  text = text.replace(/^import\s.+$\n?/gm, '');
  text = text.replace(/<SimpleWordDownload\s*\/?>/g, '');
  text = text.replace(
    /<IPAddressConfig\s*\/?>/g,
    '<div data-widget="ip-config"></div>'
  );
  text = text.replace(
    /<IPAddressCopyConfig\s*\/?>/g,
    '<div data-widget="ip-copy-config"></div>'
  );
  text = text.replace(/<\/?React\.Fragment>/g, '');
  text = text.replace(/\{\s*\/\*[\s\S]*?\*\/\s*\}/g, '');

  text = text.replace(
    /\{require\(['"](@site\/static\/[^'"]+)['"]\)\.default\}/g,
    (_, p) => {
      let rel = p.replace(/\\/g, '/');
      if (rel.startsWith('@site/static/')) rel = rel.slice('@site/static/'.length);
      return `"${BASE}/content/assets/${rel}"`;
    }
  );

  // bare require in src=
  text = text.replace(
    /src=\{require\(['"](@site\/static\/[^'"]+)['"]\)\.default\}/g,
    (_, p) => {
      let rel = p.replace(/\\/g, '/');
      if (rel.startsWith('@site/static/')) rel = rel.slice('@site/static/'.length);
      return `src="${BASE}/content/assets/${rel}"`;
    }
  );

  text = text.replace(/style=\{\{([\s\S]*?)\}\}/g, (_, inner) => {
    const parts = [];
    for (const kv of inner.matchAll(/([A-Za-z]+)\s*:\s*['"]([^'"]+)['"]/g)) {
      parts.push(`${camelToKebab(kv[1])}:${kv[2]}`);
    }
    if (!parts.length) return '';
    return `style="${parts.join(';')}"`;
  });

  text = text.replace(/\bclassName=/g, 'class=');

  // 旧 MDX 里的 page-metadata 自闭合 div（display:none）会被 HTML 解析成
  // 「未闭合的隐藏容器」，把后面正文全部藏掉 → 页面空白
  text = text.replace(/<div\b[^>]*\bid=["']page-metadata["'][^>]*\/?\s*>/gi, '');
  // 其它非 void 元素的 XML 自闭合写法改为成对标签
  text = text.replace(
    /<(div|span|p|section|article|header|footer|main|nav|h[1-6])(\s[^>]*?)\s*\/>/gi,
    '<$1$2></$1>'
  );

  text = text.replace(/\n{3,}/g, '\n\n').trim() + '\n';

  if (title && !/^#\s+/m.test(text)) {
    text = `# ${title}\n\n${text}`;
  }

  return { md: text, title, position };
}

function stripForSearch(md) {
  return md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')
    .replace(/\[[^\]]*\]\([^)]+\)/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*_`~|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 8000);
}

function listDirSorted(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true });
}

function buildTree(absDir, relDir) {
  const cat = readJson(path.join(absDir, '_category_.json')) || {};
  const children = [];

  const entries = listDirSorted(absDir);
  const folders = [];
  const files = [];

  for (const e of entries) {
    if (e.name.startsWith('.') || e.name === '_category_.json') continue;
    if (e.isDirectory()) folders.push(e);
    else if (e.name.endsWith('.mdx') || e.name.endsWith('.md')) files.push(e);
  }

  const folderNodes = [];
  for (const f of folders) {
    const childAbs = path.join(absDir, f.name);
    const childRel = path.posix.join(relDir.replace(/\\/g, '/'), f.name);
    const sub = buildTree(childAbs, childRel);
    if (sub.children.length === 0 && !sub.file) continue;
    folderNodes.push({
      type: 'category',
      id: childRel,
      title: sub.label || f.name,
      position: sub.position ?? 999,
      children: sub.children,
    });
  }

  const fileNodes = [];
  for (const f of files) {
    const stem = f.name.replace(/\.mdx?$/i, '');
    if (/^test$/i.test(stem)) continue;
    const abs = path.join(absDir, f.name);
    const raw = fs.readFileSync(abs, 'utf8');
    const { md, title, position } = convertMdx(raw);

    // skip near-empty placeholders
    const plain = stripForSearch(md);
    if (plain.length < 30 && /敬请期待|待补充|占位/.test(plain + (title || ''))) {
      continue;
    }

    const outRel = path.posix.join(relDir.replace(/\\/g, '/'), `${stem}.md`);
    const outAbs = path.join(OUT, ...outRel.split('/'));
    ensureDir(path.dirname(outAbs));
    fs.writeFileSync(outAbs, md, 'utf8');

    const docId = path.posix.join(relDir.replace(/\\/g, '/'), stem);
    fileNodes.push({
      type: 'doc',
      id: docId,
      title: title || stem,
      position: position ?? 999,
      file: `content/${outRel}`,
      children: undefined,
    });
  }

  const merged = [...folderNodes, ...fileNodes].sort(
    (a, b) => (a.position ?? 999) - (b.position ?? 999) || a.title.localeCompare(b.title, 'zh')
  );

  return {
    label: cat.label || path.basename(absDir),
    position: cat.position ?? 999,
    children: merged.map(({ position, ...rest }) => {
      void position;
      return rest;
    }),
  };
}

function collectSearchDocs(nodes, acc) {
  for (const n of nodes) {
    if (n.type === 'doc' && n.file) {
      const abs = path.join(ROOT, 'public', n.file);
      let body = '';
      try {
        body = stripForSearch(fs.readFileSync(abs, 'utf8'));
      } catch {
        /* ignore */
      }
      acc.push({
        id: n.id,
        title: n.title,
        path: n.id,
        file: n.file,
        text: body,
      });
    }
    if (n.children?.length) collectSearchDocs(n.children, acc);
  }
}

function firstDocPath(nodes) {
  for (const n of nodes) {
    if (n.type === 'doc') return n.id;
    if (n.children?.length) {
      const p = firstDocPath(n.children);
      if (p) return p;
    }
  }
  return null;
}

function rmDirForce(dir) {
  if (!fs.existsSync(dir)) return;
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      fs.rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
      return;
    } catch (err) {
      if (attempt === 4) throw err;
    }
  }
}

function main() {
  console.log('Migrating docs → public/content …');
  rmDirForce(OUT);
  ensureDir(OUT);

  // copy images
  copyDir(STATIC_IMG, ASSETS);
  const vedio = path.join(ROOT, 'static', 'vedio');
  if (fs.existsSync(vedio)) {
    copyDir(vedio, path.join(OUT, 'assets', 'vedio'));
  }

  const sections = [];
  for (const sec of SECTIONS) {
    const abs = path.join(DOCS, sec.dir);
    const tree = buildTree(abs, sec.dir);
    sections.push({
      id: sec.id,
      label: sec.label,
      dir: sec.dir,
      firstDoc: firstDocPath(tree.children),
      children: tree.children,
    });
  }

  const nav = { base: BASE, sections };
  fs.writeFileSync(path.join(OUT, 'nav.json'), JSON.stringify(nav, null, 2), 'utf8');

  const searchDocs = [];
  for (const sec of sections) collectSearchDocs(sec.children, searchDocs);
  fs.writeFileSync(
    path.join(OUT, 'search-index.json'),
    JSON.stringify({ docs: searchDocs }, null, 2),
    'utf8'
  );

  console.log(
    `Done: ${sections.length} sections, ${searchDocs.length} docs, assets → public/content/assets`
  );
}

main();
