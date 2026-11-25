import React from 'react';
import katex from 'katex';

interface MathTextProps {
  text: string;
  block?: boolean;
  className?: string;
}

const KATEX_CACHE = new Map<string, string>();
const MAX_CACHE = 400;

function renderKatex(expr: string, displayMode: boolean): string {
  const key = `${displayMode ? 'D:' : 'I:'}${expr}`;
  const hit = KATEX_CACHE.get(key);
  if (hit !== undefined) return hit;
  const html = katex.renderToString(expr, {
    displayMode,
    throwOnError: false,
    strict: false,
  });
  if (KATEX_CACHE.size >= MAX_CACHE) {
    const firstKey = KATEX_CACHE.keys().next().value;
    if (firstKey !== undefined) KATEX_CACHE.delete(firstKey);
  }
  KATEX_CACHE.set(key, html);
  return html;
}

export const MathText: React.FC<MathTextProps> = React.memo(({ text, block = false, className = '' }) => {
  if (block) {
    return (
      <div
        className={`math-block ${className}`}
        dangerouslySetInnerHTML={{ __html: renderKatex(text, true) }}
      />
    );
  }

  const tokens = text.split(/(\$\$[\s\S]+?\$\$|\$[^$\n]+?\$)/g);
  return (
    <span className={className}>
      {tokens.map((token, idx) => {
        if (token.startsWith('$$') && token.endsWith('$$') && token.length > 4) {
          return (
            <span
              key={idx}
              className="math-block"
              dangerouslySetInnerHTML={{ __html: renderKatex(token.slice(2, -2).trim(), true) }}
            />
          );
        }
        if (token.startsWith('$') && token.endsWith('$') && token.length > 2) {
          return (
            <span
              key={idx}
              className="math-inline"
              dangerouslySetInnerHTML={{ __html: renderKatex(token.slice(1, -1).trim(), false) }}
            />
          );
        }
        return <React.Fragment key={idx}>{token}</React.Fragment>;
      })}
    </span>
  );
});
