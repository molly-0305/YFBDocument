// pushToAlgolia.js
import algoliasearch from 'algoliasearch';
import fs from 'fs';
import path from 'path';

// ------------------------
// 配置项
// ------------------------
const APP_ID = 'P512NBUFH3';
const ADMIN_KEY = 'b434896eb90643dac099e4c9a2d1da59';
const INDEX_NAME = 'test_Yanjl';
const DATA_FILE = path.resolve('./docsData.json');
const algoliasearch = require('algoliasearch');
const fs = require('fs');
const path = require('path');


// 初始化 Algolia 客户端
const client = algoliasearch(APP_ID, ADMIN_KEY);
const index = client.initIndex(INDEX_NAME);

// 读取 JSON 文件
function readData() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('❌ 读取 JSON 文件失败:', err);
    process.exit(1);
  }
}

// 上传到 Algolia
async function pushData() {
  const data = readData();

  if (!Array.isArray(data) || data.length === 0) {
    console.warn('⚠️ 数据为空，停止上传');
    return;
  }

  try {
    const response = await index.saveObjects(data, {
      autoGenerateObjectIDIfNotExist: true,
    });
    console.log('✅ 上传成功:', response);
  } catch (error) {
    console.error('❌ 上传失败:', error);
  }
}

pushData();
