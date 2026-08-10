import {
  useMemo,
  useState,
  type ReactNode,
  type ComponentPropsWithoutRef,
} from 'react';
import styles from './CopyableCodeBlock.module.css';

function getText(node: ReactNode): string {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(getText).join('');
  if (typeof node === 'object' && node !== null && 'props' in node) {
    const el = node as { props?: { children?: ReactNode } };
    return getText(el.props?.children);
  }
  return '';
}

async function writeClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fall through
  }
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

export function CopyableCodeBlock({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<'pre'>) {
  const [copied, setCopied] = useState(false);
  const text = useMemo(
    () => getText(children).replace(/\n$/, ''),
    [children]
  );

  async function onCopy() {
    if (!text) return;
    const ok = await writeClipboard(text);
    if (!ok) {
      window.prompt('复制失败，请手动复制：', text);
      return;
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className={styles.wrap}>
      <button
        type="button"
        className={`${styles.copyBtn}${copied ? ` ${styles.copyBtnCopied}` : ''}`}
        onClick={onCopy}
        aria-label="复制代码"
      >
        {copied ? '已复制' : '复制'}
      </button>
      <pre className={className} {...props}>
        {children}
      </pre>
    </div>
  );
}
