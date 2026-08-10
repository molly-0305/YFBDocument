import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MiniSearch from 'minisearch';
import { loadNav, loadSearchIndex, docPathToRoute } from '../lib/content';
import type { NavSection, SearchDoc } from '../types';
import styles from './Shell.module.css';

/** 中英混合分词：英文按词，中文按字/二字词 */
function tokenizeSearchText(text: string): string[] {
  const tokens: string[] = [];
  const normalized = String(text).toLowerCase();
  const parts = normalized.match(/[a-z0-9]+|[\u4e00-\u9fff]+/g) || [];
  for (const part of parts) {
    if (/[\u4e00-\u9fff]/.test(part)) {
      for (let i = 0; i < part.length; i++) {
        tokens.push(part[i]);
        if (i + 1 < part.length) tokens.push(part.slice(i, i + 2));
      }
    } else if (part.length >= 1) {
      tokens.push(part);
    }
  }
  return tokens;
}

function createSearchEngine() {
  return new MiniSearch<SearchDoc>({
    fields: ['title', 'text'],
    storeFields: ['title', 'path', 'file', 'text'],
    idField: 'id',
    tokenize: (text) => tokenizeSearchText(String(text)),
    processTerm: (term) => term,
  });
}

type Hit = {
  id: string;
  title: string;
  path: string;
  snippet: string;
};

function makeSnippet(text: string, query: string): string {
  const q = query.trim();
  if (!q || !text) return '';
  const lower = text.toLowerCase();
  const key = q.toLowerCase();
  let idx = lower.indexOf(key);
  if (idx < 0) {
    // 尝试用查询里的中文片段定位
    const zh = key.match(/[\u4e00-\u9fff]{2,}/)?.[0];
    if (zh) idx = lower.indexOf(zh);
  }
  if (idx < 0) {
    return text.slice(0, 72).replace(/\s+/g, ' ') + (text.length > 72 ? '…' : '');
  }
  const start = Math.max(0, idx - 16);
  const end = Math.min(text.length, idx + key.length + 40);
  let snip = text.slice(start, end).replace(/\s+/g, ' ');
  if (start > 0) snip = '…' + snip;
  if (end < text.length) snip += '…';
  return snip;
}

function sectionLabelOf(path: string, sections: NavSection[]): string {
  const top = path.split('/')[0];
  return sections.find((s) => s.id === top || s.dir === top)?.label || '';
}

/** 高亮关键词：用深色字 + 浅黄底，避免低对比蓝色 */
function highlightText(text: string, query: string) {
  const q = query.trim();
  if (!q || !text) return text;
  const keys = Array.from(
    new Set(
      [q, ...(q.match(/[\u4e00-\u9fff]{2,}|[a-zA-Z0-9]{2,}/g) || [])]
        .map((s) => s.trim())
        .filter((s) => s.length >= 1)
        .sort((a, b) => b.length - a.length)
    )
  ).slice(0, 6);
  if (!keys.length) return text;

  const escaped = keys.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const re = new RegExp(`(${escaped.join('|')})`, 'gi');
  const parts = text.split(re);
  return parts.map((part, i) =>
    keys.some((k) => part.toLowerCase() === k.toLowerCase()) ? (
      <mark key={`${part}-${i}`} className={styles.searchMark}>
        {part}
      </mark>
    ) : (
      <span key={`${part}-${i}`}>{part}</span>
    )
  );
}

export function Shell({
  children,
  activeSection,
}: {
  children: ReactNode;
  activeSection?: string;
}) {
  const [sections, setSections] = useState<NavSection[]>([]);
  const [query, setQuery] = useState('');
  const [hits, setHits] = useState<Hit[]>([]);
  const [indexReady, setIndexReady] = useState(false);
  const [indexError, setIndexError] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const navigate = useNavigate();
  const miniRef = useRef(createSearchEngine());
  const wrapRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadNav()
      .then((nav) => {
        if (!cancelled) setSections(nav.sections);
      })
      .catch(() => {
        if (!cancelled) setSections([]);
      });

    loadSearchIndex()
      .then((docs) => {
        if (cancelled) return;
        // StrictMode 会跑两次 effect：每次用新引擎，避免 duplicate ID
        const engine = createSearchEngine();
        engine.addAll(docs);
        miniRef.current = engine;
        setIndexReady(true);
        setIndexError(false);
      })
      .catch(() => {
        if (!cancelled) {
          setIndexReady(false);
          setIndexError(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const runSearch = useCallback(
    (raw: string) => {
      const q = raw.trim();
      if (!q || !indexReady) {
        setHits([]);
        setActiveIdx(-1);
        return;
      }
      try {
        const results = miniRef.current
          .search(q, {
            boost: { title: 6, text: 1 },
            prefix: true,
            // 中文不要开 fuzzy，会几乎搜不到
            fuzzy: /^[a-z0-9\s.-]+$/i.test(q) ? 0.15 : false,
            combineWith: 'AND',
          })
          .slice(0, 15);

        setHits(
          results.map((h) => ({
            id: String(h.id),
            title: String(h.title || ''),
            path: String(h.path || h.id),
            snippet: makeSnippet(String(h.text || ''), q),
          }))
        );
        setActiveIdx(results.length ? 0 : -1);
        setOpen(true);
      } catch {
        setHits([]);
        setActiveIdx(-1);
      }
    },
    [indexReady]
  );

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    runSearch(query);
    setOpen(true);
  }

  function onChange(value: string) {
    setQuery(value);
    if (timerRef.current) window.clearTimeout(timerRef.current);
    if (!value.trim()) {
      setHits([]);
      setOpen(false);
      setActiveIdx(-1);
      return;
    }
    timerRef.current = window.setTimeout(() => runSearch(value), 180);
  }

  function goTo(hit: Hit) {
    navigate(docPathToRoute(hit.path));
    setQuery('');
    setHits([]);
    setOpen(false);
    setActiveIdx(-1);
  }

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  useEffect(
    () => () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    },
    []
  );

  const placeholder = useMemo(() => {
    if (indexError) return '搜索不可用';
    if (!indexReady) return '索引加载中…';
    return '搜索文档…';
  }, [indexError, indexReady]);

  function onInputKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (!open || !hits.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx((i) => (i + 1) % hits.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx((i) => (i <= 0 ? hits.length - 1 : i - 1));
    } else if (e.key === 'Enter' && activeIdx >= 0 && hits[activeIdx]) {
      e.preventDefault();
      goTo(hits[activeIdx]);
    }
  }

  return (
    <div className={styles.shell}>
      <header className={styles.top}>
        <Link to="/" className={styles.brandLink}>
          <img
            className={styles.mark}
            src={`${import.meta.env.BASE_URL}brand-mark.svg`}
            alt=""
            width={34}
            height={34}
            decoding="async"
          />
          <span>
            <strong>软件事业部</strong>
            <small>文档知识库</small>
          </span>
        </Link>

        <nav className={styles.nav}>
          {sections.map((s) => (
            <Link
              key={s.id}
              to={s.firstDoc ? docPathToRoute(s.firstDoc) : '/'}
              className={
                activeSection === s.id ? styles.navActive : styles.navLink
              }
            >
              {s.label}
            </Link>
          ))}
        </nav>

        <div className={styles.search} ref={wrapRef}>
          <form onSubmit={onSubmit} role="search">
            <input
              value={query}
              onChange={(e) => onChange(e.target.value)}
              onFocus={() => {
                if (query.trim() && hits.length) setOpen(true);
                else if (query.trim()) runSearch(query);
              }}
              onKeyDown={onInputKeyDown}
              placeholder={placeholder}
              aria-label="搜索文档"
              aria-expanded={open}
              aria-controls="doc-search-results"
              autoComplete="off"
              disabled={indexError}
            />
            <button type="submit" disabled={!indexReady || indexError}>
              搜索
            </button>
          </form>

          {open && query.trim() ? (
            <ul
              id="doc-search-results"
              className={styles.searchResults}
              role="listbox"
            >
              {!indexReady ? (
                <li className={styles.searchMeta}>索引加载中…</li>
              ) : hits.length === 0 ? (
                <li className={styles.searchMeta}>未找到相关文档</li>
              ) : (
                hits.map((h, i) => (
                  <li key={h.id} role="option" aria-selected={i === activeIdx}>
                    <button
                      type="button"
                      className={
                        i === activeIdx ? styles.searchHitActive : styles.searchHit
                      }
                      onMouseEnter={() => setActiveIdx(i)}
                      onClick={() => goTo(h)}
                    >
                      <span className={styles.searchTitle}>
                        {highlightText(h.title, query)}
                      </span>
                      {sectionLabelOf(h.path, sections) ? (
                        <span className={styles.searchSection}>
                          {sectionLabelOf(h.path, sections)}
                        </span>
                      ) : null}
                      {h.snippet ? (
                        <span className={styles.searchSnippet}>
                          {highlightText(h.snippet, query)}
                        </span>
                      ) : null}
                    </button>
                  </li>
                ))
              )}
            </ul>
          ) : null}
        </div>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
