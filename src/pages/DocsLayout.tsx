import { useEffect, useMemo, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Shell } from '../components/Shell';
import {
  docPathToRoute,
  loadNav,
  routeToDocId,
  sectionForDoc,
} from '../lib/content';
import type { NavNode, NavSection } from '../types';
import styles from './DocsLayout.module.css';

function SidebarTree({
  nodes,
  docId,
}: {
  nodes: NavNode[];
  docId: string;
}) {
  // 手风琴：同级只展开一个；默认全部关闭
  const [openId, setOpenId] = useState<string | null>(null);

  // 切换栏目/文档树时收起
  useEffect(() => {
    setOpenId(null);
  }, [nodes]);

  return (
    <ul className={styles.tree}>
      {nodes.map((n) =>
        n.type === 'category' ? (
          <li key={n.id} className={styles.cat}>
            <details
              open={openId === n.id}
              onToggle={(e) => {
                e.preventDefault();
              }}
            >
              <summary
                onClick={(e) => {
                  e.preventDefault();
                  setOpenId((prev) => (prev === n.id ? null : n.id));
                }}
              >
                {n.title}
              </summary>
              {openId === n.id ? (
                <SidebarTree nodes={n.children} docId={docId} />
              ) : null}
            </details>
          </li>
        ) : (
          <li key={n.id}>
            <NavLink
              to={docPathToRoute(n.id)}
              className={({ isActive }) =>
                isActive ? styles.docActive : styles.docLink
              }
            >
              {n.title}
            </NavLink>
          </li>
        )
      )}
    </ul>
  );
}

export function DocsLayout() {
  const location = useLocation();
  const [sections, setSections] = useState<NavSection[]>([]);
  const docId = routeToDocId(location.pathname);

  useEffect(() => {
    loadNav()
      .then((n) => setSections(n.sections))
      .catch(() => setSections([]));
  }, []);

  const section = useMemo(
    () => sectionForDoc(sections, docId),
    [sections, docId]
  );

  return (
    <Shell activeSection={section?.id}>
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <h2 className={styles.sideTitle}>{section?.label || '文档'}</h2>
          {section ? (
            <SidebarTree nodes={section.children} docId={docId} />
          ) : null}
        </aside>
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </Shell>
  );
}
