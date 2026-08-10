import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: '软件安装',
    description: 'Windows / Linux / Docker 环境准备，以及各品牌交换机、SIP录音系统部署手册。',
    to: '/softwareInstall/Windows 环境前期准备',
  },
  {
    title: '使用手册',
    description: '计费、话务台、录音、中间件等产品操作说明，按场景快速查找。',
    to: '/userGuide/SIP录音管理系统',
  },
  {
    title: '知识库与排障',
    description: 'CS/BS/Web、交换机与网关常见问题汇总，便于现场快速定位。',
    to: '/knowledgeBase/CS端排错/区域格式导致安装CS端报错',
  },
];

function Feature({title, description, to}) {
  return (
    <div className={clsx('col col--4')}>
      <Link className={styles.card} to={to}>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
        <span className={styles.more}>进入查阅 →</span>
      </Link>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.sectionHead}>
          <Heading as="h2">文档分区</Heading>
          <p>按安装、使用、排障三类组织，减少翻找成本。</p>
        </div>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
