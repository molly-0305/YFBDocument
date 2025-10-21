//这个是首页特色卡片区域组件
/*
先用一个数组 FeatureList 定义若干条 feature（每条包含标题、图示、描述）
然后用 Feature 组件渲染单个卡片，最后 HomepageFeatures 把这些卡片按网格（3 列）渲染出来。
*/
import clsx from 'clsx';  //clsx 是一个小工具，用来合并条件性的 CSS class 名称（类似 classnames）。这里用来生成组件的 className。当前代码里只是静态类（'col col--4'），clsx 不是必须，但留着方便以后动态类名。
import Heading from '@theme/Heading';     //从 Docusaurus 主题导入的 Heading 组件。它能保证站点标题样式/锚点/可访问性与主题一致，通常推荐用主题的 Heading 而不是直接 <h3>
import styles from './styles.module.css';    //使用 CSS Modules。styles 是一个对象，里面的键对应 styles.module.css 中定义的类，能避免类名冲突（例如 styles.features, styles.featureSvg）
import MountainSvg from '@site/static/img/undraw_docusaurus_mountain.svg';
import TreeSvg from '@site/static/img/undraw_docusaurus_tree.svg';
import ReactSvg from '@site/static/img/undraw_docusaurus_react.svg';
//FeatureList数组
const FeatureList = [
  {
    title: '软件事业部',
    Svg:MountainSvg,
    description: (
      <>
        软件事业部负责软件安装、交换机配置及相关技术服务。我们持续更新知识库与博客，为团队提供最新文档与技术分享，助力能力提升。
      </>
    ),
  },
  {
    title: '文档知识库',
    Svg: TreeSvg,
    description: (
      <>
        文档知识库汇集软件安装指南、交换机配置手册等技术资料，内容持续更新，便于快速检索与学习，并与博客联动分享实践经验
      </>
    ),
  },
  {
    title: '进入部门知识库',
    Svg: ReactSvg,
    description: (
      <>
        点击进入部门知识库，可便捷查阅软件安装、交换机配置等文档。平台内容持续更新，支持快速检索，助力高效获取技术信息。
      </>
    ),
  },
];

//Feature组件
function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

//HomepageFeatures主组件
export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
