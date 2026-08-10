import fs from 'fs';

let s = fs.readFileSync('scripts/_SimpleWordDownload.jsx.bak', 'utf8');
s = s.replace(/\.theme-doc-markdown/g, '.markdown');
s = s.replace(/theme-doc-markdown/g, 'markdown');

const getter = `const getContentElement = () =>
    document.querySelector('.markdown') ||
    document.querySelector('article .markdown') ||
    document.querySelector('article') ||
    document.querySelector('main');`;

if (/const getContentElement = \(\) =>/.test(s)) {
  s = s.replace(/const getContentElement = \(\) =>[\s\S]*?;/, getter);
} else {
  // insert after useState lines
  s = s.replace(
    /const \[pdfLoading, setPdfLoading\] = useState\(false\);/,
    `const [pdfLoading, setPdfLoading] = useState(false);\n\n  ${getter}`
  );
}

s = s.replace(
  /export default WordDownloadWithPrint;?\s*$/,
  `export function WordPdfExport(props) {
  return <WordDownloadWithPrint {...props} />;
}

export default WordPdfExport;
`
);

fs.writeFileSync('src/components/WordPdfExport.jsx', s, 'utf8');
console.log('WordPdfExport written', fs.statSync('src/components/WordPdfExport.jsx').size);
