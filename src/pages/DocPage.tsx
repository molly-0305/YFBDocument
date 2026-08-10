import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import {
  findDoc,
  loadMarkdown,
  loadNav,
  routeToDocId,
  sectionForDoc,
} from '../lib/content';
import { WordPdfExport } from '../components/WordPdfExport';
import { IPAddressConfig } from '../components/IPAddressConfig';
import { IPAddressCopyConfig } from '../components/IPAddressCopyConfig';
import { CopyableCodeBlock } from '../components/CopyableCodeBlock';
import { ImageLightbox } from '../components/ImageLightbox';
import styles from './DocPage.module.css';

type TocItem = { id: string; text: string; level: 2 | 3 };

function slugify(text: string, used: Map<string, number>): string {
  const base =
    text
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\u4e00-\u9fff-]/g, '') || 'section';
  const n = used.get(base) ?? 0;
  used.set(base, n + 1);
  return n === 0 ? base : `${base}-${n}`;
}

function Widget({ name }: { name: string }) {
  if (name === 'ip-config') return <IPAddressConfig />;
  if (name === 'ip-copy-config') return <IPAddressCopyConfig />;
  return null;
}

export function DocPage() {
  const location = useLocation();
  const docId = routeToDocId(location.pathname);
  const markdownRef = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState('');
  const [markdown, setMarkdown] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [sectionLabel, setSectionLabel] = useState('');
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState('');
  const [preview, setPreview] = useState<{ src: string; alt: string } | null>(
    null
  );

  const openPreview = useCallback((src: string, alt: string) => {
    if (!src) return;
    setPreview({ src, alt });
  }, []);

  const closePreview = useCallback(() => setPreview(null), []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError('');
      setActiveId('');
      setToc([]);
      try {
        const nav = await loadNav();
        const section = sectionForDoc(nav.sections, docId);
        const meta = section ? findDoc(section.children, docId) : null;
        if (!meta) {
          if (!cancelled) {
            setError('文档不存在');
            setLoading(false);
          }
          return;
        }
        let md = await loadMarkdown(meta.file);
        // 防御：去掉可能把正文包进 display:none 的旧 metadata
        md = md.replace(/<div\b[^>]*\bid=["']page-metadata["'][^>]*\/?\s*>[\s\S]*?<\/div>/gi, '');
        md = md.replace(/<div\b[^>]*\bid=["']page-metadata["'][^>]*\/?\s*>/gi, '');
        if (!cancelled) {
          setTitle(meta.title);
          setSectionLabel(section?.label || '');
          setMarkdown(md);
          setLoading(false);
        }
      } catch {
        if (!cancelled) {
          setError('文档加载失败');
          setLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [docId]);

  useEffect(() => {
    setPreview(null);
  }, [docId]);

  // 渲染完成后，按真实 DOM 标题生成目录并写入 id（保证点击能跳转）
  useEffect(() => {
    if (loading || !markdown) return;

    const timer = window.setTimeout(() => {
      const root = markdownRef.current;
      if (!root) return;

      const used = new Map<string, number>();
      const items: TocItem[] = [];
      const headings = root.querySelectorAll('h2, h3');
      headings.forEach((el) => {
        const level = el.tagName === 'H2' ? 2 : 3;
        const text = (el.textContent || '').trim();
        if (!text) return;
        const id = slugify(text, used);
        el.id = id;
        items.push({ id, text, level });
      });
      setToc(items);
      if (items[0]) setActiveId(items[0].id);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [loading, markdown, docId]);

  useEffect(() => {
    if (!toc.length) return;

    const nodes = toc
      .map((t) => document.getElementById(t.id))
      .filter((el): el is HTMLElement => !!el);
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target?.id) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-90px 0px -55% 0px', threshold: [0, 1] }
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [toc]);

  const components = useMemo<Components>(
    () => ({
      div: (props) => {
        const widget = (props as { 'data-widget'?: string })['data-widget'];
        if (widget) return <Widget name={widget} />;
        const { children, className, style, id } = props;
        return (
          <div className={className} style={style} id={id}>
            {children}
          </div>
        );
      },
      pre: (props) => <CopyableCodeBlock {...props} />,
      img: ({ src, alt, title, className }) => {
        if (!src) return null;
        return (
          <img
            src={src}
            alt={alt || ''}
            title={title || alt || '点击放大'}
            className={`${styles.zoomableImg}${className ? ` ${className}` : ''}`}
            loading="lazy"
            onClick={() => openPreview(src, alt || '')}
          />
        );
      },
    }),
    [openPreview]
  );

  function scrollToId(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 88;
    window.scrollTo({ top, behavior: 'smooth' });
    setActiveId(id);
    history.replaceState(null, '', `#${encodeURIComponent(id)}`);
  }

  return (
    <div className={styles.docRow}>
      <article className={styles.doc}>
        <div className={styles.crumb}>
          <Link to="/">首页</Link>
          {sectionLabel ? (
            <>
              <span>/</span>
              <span>{sectionLabel}</span>
            </>
          ) : null}
          {title ? (
            <>
              <span>/</span>
              <span>{title}</span>
            </>
          ) : null}
        </div>

        {loading ? <p className={styles.muted}>加载中…</p> : null}
        {error ? <p className={styles.error}>{error}</p> : null}

        {!loading && !error ? (
          <>
            <div
              ref={markdownRef}
              className={`markdown ${styles.markdown}`}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={components}
              >
                {markdown}
              </ReactMarkdown>
            </div>
            <WordPdfExport />
          </>
        ) : null}
      </article>

      {preview ? (
        <ImageLightbox
          src={preview.src}
          alt={preview.alt}
          onClose={closePreview}
        />
      ) : null}

      {!loading && !error && toc.length > 0 ? (
        <aside className={styles.toc}>
          <h2 className={styles.tocTitle}>本页导航</h2>
          <ul className={styles.tocList}>
            {toc.map((item) => (
              <li
                key={item.id}
                className={item.level === 3 ? styles.tocH3 : styles.tocH2}
              >
                <button
                  type="button"
                  className={
                    activeId === item.id ? styles.tocActive : styles.tocLink
                  }
                  onClick={() => scrollToId(item.id)}
                >
                  {item.text}
                </button>
              </li>
            ))}
          </ul>
        </aside>
      ) : null}
    </div>
  );
}
