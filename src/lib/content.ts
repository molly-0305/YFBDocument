import type { NavFile, NavNode, SearchDoc } from '../types';

export async function loadNav(): Promise<NavFile> {
  const res = await fetch(`${import.meta.env.BASE_URL}content/nav.json`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('无法加载导航');
  return res.json();
}

export async function loadSearchIndex(): Promise<SearchDoc[]> {
  const res = await fetch(`${import.meta.env.BASE_URL}content/search-index.json`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('无法加载搜索索引');
  const data = (await res.json()) as { docs: SearchDoc[] };
  return data.docs;
}

export async function loadMarkdown(file: string): Promise<string> {
  // file like "content/softwareInstall/foo.md"
  const url = `${import.meta.env.BASE_URL}${file.replace(/^\//, '')}`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('文档不存在');
  return res.text();
}

export function findDoc(
  nodes: NavNode[],
  docId: string
): { title: string; file: string } | null {
  for (const n of nodes) {
    if (n.type === 'doc' && n.id === docId) {
      return { title: n.title, file: n.file };
    }
    if (n.type === 'category') {
      const found = findDoc(n.children, docId);
      if (found) return found;
    }
  }
  return null;
}

export function sectionForDoc(
  sections: NavFile['sections'],
  docId: string
): NavFile['sections'][number] | null {
  for (const s of sections) {
    if (docId === s.dir || docId.startsWith(s.dir + '/')) return s;
    if (findDoc(s.children, docId)) return s;
  }
  return null;
}

export function docPathToRoute(docId: string): string {
  return `/docs/${docId.split('/').map(encodeURIComponent).join('/')}`;
}

export function routeToDocId(pathname: string): string {
  // /docs/a/b/c → a/b/c
  const raw = pathname.replace(/^\/docs\/?/, '');
  return raw
    .split('/')
    .map((p) => decodeURIComponent(p))
    .filter(Boolean)
    .join('/');
}
