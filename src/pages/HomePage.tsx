import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Shell } from '../components/Shell';
import { docPathToRoute, loadNav } from '../lib/content';
import type { NavSection } from '../types';
import styles from './HomePage.module.css';

const FALLBACK_CARDS = [
  {
    title: '软件安装',
    description:
      'Windows / Linux / Docker 环境准备，以及各品牌交换机、SIP录音系统部署手册。',
    sectionId: 'softwareInstall',
  },
  {
    title: '使用手册',
    description: '计费、话务台、录音、中间件等产品操作说明，按场景快速查找。',
    sectionId: 'userGuide',
  },
  {
    title: '知识库与排障',
    description: 'CS/BS/Web、交换机与网关常见问题汇总，便于现场快速定位。',
    sectionId: 'knowledgeBase',
  },
];

export function HomePage() {
  const [sections, setSections] = useState<NavSection[]>([]);

  useEffect(() => {
    loadNav()
      .then((n) => setSections(n.sections))
      .catch(() => setSections([]));
  }, []);

  function linkFor(sectionId: string, fallback = '/') {
    const sec = sections.find((s) => s.id === sectionId);
    return sec?.firstDoc ? docPathToRoute(sec.firstDoc) : fallback;
  }

  return (
    <Shell>
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>内部文档平台</p>
          <h1>软件事业部</h1>
          <p className={styles.sub}>
            交换机 · 录音 · 话务系统文档知识库
          </p>
          <div className={styles.actions}>
            <Link className={styles.primary} to={linkFor('softwareInstall')}>
              从软件安装开始
            </Link>
            <Link className={styles.ghost} to={linkFor('knowledgeBase')}>
              查阅知识库
            </Link>
          </div>
        </div>
      </header>

      <section className={styles.features}>
        <div className={styles.sectionHead}>
          <h2>文档分区</h2>
          <p>按安装、使用、排障三类组织，减少翻找成本。</p>
        </div>
        <div className={styles.cards}>
          {FALLBACK_CARDS.map((card) => (
            <Link
              key={card.sectionId}
              className={styles.card}
              to={linkFor(card.sectionId)}
            >
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <span>进入查阅 →</span>
            </Link>
          ))}
        </div>
      </section>
    </Shell>
  );
}
