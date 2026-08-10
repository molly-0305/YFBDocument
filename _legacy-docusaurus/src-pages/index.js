import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className={clsx('container', styles.heroInner)}>
        <p className={styles.eyebrow}>内部文档平台</p>
        <Heading as="h1" className={clsx('hero__title', styles.heroTitle)}>
          {siteConfig.title}
        </Heading>
        <p className={clsx('hero__subtitle', styles.heroSubtitle)}>
          {siteConfig.tagline}
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/softwareInstall/Windows 环境前期准备">
            从软件安装开始
          </Link>
          <Link
            className={clsx('button button--outline button--lg', styles.ghostBtn)}
            to="/knowledgeBase/CS端排错/区域格式导致安装CS端报错">
            查阅知识库
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="文档知识库"
      description={`${siteConfig.title}：交换机通讯、SIP录音、话务系统安装与排障文档`}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
