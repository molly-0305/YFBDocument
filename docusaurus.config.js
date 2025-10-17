
//此模块主要定义文档网站：基础信息、主题、导航栏、侧边栏、博客、代码高亮风格

//引入代码高亮主题，后面prism配置会用到
import {themes as prismThemes} from 'prism-react-renderer';

//基本网站信息
/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '软件事业部',   //主页正中间标题
  tagline: '文档知识库',   //主页下方按钮题目
  favicon: 'img/favicon.ico',  //网站图标

  //Docusaurus未来兼容配置
  future: {
    v4: true, 
  },

  //部署相关配置
  url: 'https://Molly-0305.github.io',   //可以将自己部署的网址域名写到这个上面
  baseUrl: '/Knowledge-Graph/',     

  //放在githubPage上使用的
  organizationName: 'Molly-0305', 
  projectName: 'Knowledge-Graph', 
  deploymentBranch: 'master', // 使用 main 分支而不是 gh-pages

  // 添加这个配置来启用自动部署
  scripts: [],

  trailingSlash: false,

  //链接失效是报错或者警告
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',


  //设置语言：en:英语，zh-Hans:中文
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['en', 'zh-Hans'],
  },

  //预设
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        //文档相关（侧边栏sidebars.js，编辑连接editUrl）
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/Molly-0305/Knowledge-Graph/edit/source/'
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],



  // 或者使用 plugins（根据插件文档）
   plugins: [
    [
      'docusaurus-lunr-search',
      {
        // 中文搜索配置
        languages: ['en', 'zh'], // 支持英文和中文
        indexBaseUrl: true, // 如果你的网站不在根路径
        // 其他可选配置
      },
    ],
  ],
  
//主题配置themeConfig
  
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      algolia:{
      appId: 'P512NBUFH3',         // 申请后提供：'你的APP_ID'
      apiKey: '09c190244c8695e32347d2a437c7997f',       // 申请后提供（前端用的 search-only key） ：'你的API_KEY'
      indexName: 'test_Yanjl', // 索引名称:'你的INDEX_NAME'

      // 可选配置：
      contextualSearch: true, // 是否按当前页面上下文搜索（比如 /docs/ 下只搜文档）
      searchParameters: {},   // 传给 Algolia API 的额外参数
      searchPagePath: 'search', // 是否开启搜索结果页（默认无）
    },
      //导航栏navbar
      navbar: {
        title: '软件事业部',
        //导航栏左侧LOGO，不要可以注释掉
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',  //关联sidebars.js里的不同文档
            sidebarId: 'softwareInstall',
            position: 'left',
            label: '软件安装',
          },
                    {
            type: 'docSidebar',  //关联sidebars.js里的不同文档
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
            label: '技术支持信息',
          },
          // {to: '/blog', label: '博客', position: 'left'},
          {
            href: 'https://github.com/facebook/docusaurus',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },


      //页脚部分设置
      footer: {
        style: 'dark',
        links: [
          // {
          //   title: '知识库',
          //   items: [
          //     {
          //       label: 'Tutorial',
          //       to: '/docs/intro',
          //     },
          //   ],
          // },
          {
            title: '程序员社区',
            items: [
              {
                label: 'ChatGPT',
                href: 'https://chatgpt.com/',
              },
              {
                label: 'Deepseek',
                href: 'https://chat.deepseek.com/',
              },
            ],
          },
          {
            title: '更多',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/facebook/docusaurus',
              },
            ],
          },
        ],
        copyright: ` 此知识库为软件事业部所有 如有雷同 那就是你抄我的© ${new Date().getFullYear()} `,
      },
      //代码高亮
      prism: {
        theme: prismThemes.github,   //白天模式
        darkTheme: prismThemes.dracula,    //夜间模式
      },
    }),
};

export default config;
