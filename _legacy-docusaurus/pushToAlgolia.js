/**
 * 将 docsData.json 上传到 Algolia
 * 请使用环境变量，勿把 Admin Key 写进仓库：
 *   ALGOLIA_APP_ID / ALGOLIA_ADMIN_KEY / ALGOLIA_INDEX_NAME
 */
const algoliasearch = require('algoliasearch');
const fs = require('fs');
const path = require('path');

const APP_ID = process.env.ALGOLIA_APP_ID;
const ADMIN_KEY = process.env.ALGOLIA_ADMIN_KEY;
const INDEX_NAME = process.env.ALGOLIA_INDEX_NAME || 'test_Yanjl';
const DATA_FILE = path.resolve('./docsData.json');

if (!APP_ID || !ADMIN_KEY) {
  console.error('❌ 请先设置环境变量 ALGOLIA_APP_ID 与 ALGOLIA_ADMIN_KEY');
  process.exit(1);
}

const client = algoliasearch(APP_ID, ADMIN_KEY);
const index = client.initIndex(INDEX_NAME);

function readData() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('❌ 读取 JSON 文件失败:', err);
    process.exit(1);
  }
}

async function pushData() {
  const data = readData();
  if (!Array.isArray(data) || data.length === 0) {
    console.warn('⚠️ 数据为空，停止上传');
    return;
  }

  try {
    const {objectIDs} = await index.saveObjects(data);
    console.log(`✅ 上传成功，共 ${objectIDs.length} 条`);
  } catch (err) {
    console.error('❌ 上传失败:', err);
    process.exit(1);
  }
}

pushData();
