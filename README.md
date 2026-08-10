# 软件事业部文档知识库（v3 · Vite）

从 Docusaurus 迁到 **Vite + React** 的文档站，功能对齐原知识库（五栏目、搜索、Word/PDF、IP 组件），**无访问码登录**。

路径：`E:\Myproject\yfbdocument-v3`  
源 MDX 仍保留在 `docs/`，构建前由脚本同步到 `public/content/`。

## 本地运行

```powershell
cd E:\Myproject\yfbdocument-v3
$env:npm_config_cache = "$env:LOCALAPPDATA\npm-cache-yfb"
npm install
npm run dev
```

打开：http://localhost:3001/YFBDocument/

## 常用命令

```bash
npm run migrate   # 仅同步 docs → public/content
npm run dev       # 开发（会先 migrate）
npm run build     # 生产构建（会先 migrate）
npm run preview   # 预览 dist
```

## 部署

1. `npm run build` 生成 `dist/`
2. 将 `dist` 内容部署到站点的 `/YFBDocument/` 路径
3. IIS 需 SPA 回退到 `index.html`（参考 `public/web.config`）

## 目录说明

| 路径 | 说明 |
| --- | --- |
| `docs/` | 原始 MDX（可继续编辑） |
| `static/img/` | 原始图片 |
| `public/content/` | 迁移后的 Markdown / nav / 搜索索引（自动生成） |
| `src/` | Vite React 应用 |
| `_legacy-docusaurus/` | 旧 Docusaurus 配置归档 |

原 Docusaurus 项目副本：`E:\Myproject\yfbdocument-improved`（未改）。
