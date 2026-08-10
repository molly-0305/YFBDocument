export interface NavDoc {
  type: 'doc';
  id: string;
  title: string;
  file: string;
}

export interface NavCategory {
  type: 'category';
  id: string;
  title: string;
  children: NavNode[];
}

export type NavNode = NavDoc | NavCategory;

export interface NavSection {
  id: string;
  label: string;
  dir: string;
  firstDoc: string | null;
  children: NavNode[];
}

export interface NavFile {
  base: string;
  sections: NavSection[];
}

export interface SearchDoc {
  id: string;
  title: string;
  path: string;
  file: string;
  text: string;
}
