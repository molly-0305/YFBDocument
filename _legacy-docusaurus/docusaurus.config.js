// 软件事业部文档知识库 - Docusaurus 配置
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '软件事业部',
  tagline: '交换机 · 录音 · 话务系统文档知识库',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://Molly-0305.github.io',
  baseUrl: '/YFBDocument/',

  staticDirectories: ['static'],

  organizationName: 'Molly-0305',
  projectName: 'YFBDocument',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  stylesheets: [
    {
      href: 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Noto+Sans+SC:wght@400;500;600;700&display=swap',
      type: 'text/css',
    },
  ],

  // 文档正文多为中文；英文内容以独立目录维护，避免空 i18n 配置
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/Molly-0305/YFBDocument/edit/master/',
        },
        blog: false,
        theme: {
          customCss: ['./src/css/custom.css', './src/css/style.css'],
        },
      }),
    ],
  ],

  // 仅保留本地中文搜索，避免与 Algolia 重复
  plugins: [
    [
      'docusaurus-lunr-search',
      {
        languages: ['en', 'zh'],
        indexBaseUrl: true,
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/docusaurus-social-card.jpg',
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
      colorMode: {
        defaultMode: 'light',
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: '软件事业部',
        logo: {
          alt: '软件事业部文档库',
          src: 'img/logo.svg',
          className: 'custom-logo',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'softwareInstall',
            position: 'left',
            label: '软件安装',
          },
          {
            type: 'docSidebar',
            sidebarId: 'userGuide',
            position: 'left',
            label: '使用手册',
          },
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: '知识库',
          },
          {
            type: 'docSidebar',
            sidebarId: 'update',
            position: 'left',
            label: '更新',
          },
          {
            type: 'docSidebar',
            sidebarId: 'technicalsupport',
            position: 'left',
            label: '技术支持',
          },
          {
            href: 'https://github.com/Molly-0305/YFBDocument',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '文档导航',
            items: [
              {label: '软件安装', to: '/softwareInstall/Windows 环境前期准备'},
              {label: '使用手册', to: '/userGuide/SIP录音管理系统'},
              {label: '知识库', to: '/knowledgeBase/CS端排错/区域格式导致安装CS端报错'},
            ],
          },
          {
            title: '常用入口',
            items: [
              {label: '更新日志', to: '/update/交换机通讯管理系统6.0/登录页面更新'},
              {label: '技术支持', to: '/technicalsupport/案例配置/波司登亿联计费案例'},
              {
                label: '项目仓库',
                href: 'https://github.com/Molly-0305/YFBDocument',
              },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} 软件事业部文档知识库 · 仅供内部使用`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['bash', 'powershell', 'sql', 'json'],
      },
    }),
};

export default config;
