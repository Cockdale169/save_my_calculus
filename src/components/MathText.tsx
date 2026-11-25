import React from 'react';
import katex from 'katex';
interface MathTextProps {
text: string;
block?: boolean;
className?: string;
}
export const MathText: React.FC<MathTextProps> = ({ text, block = false, className = '' }) => {
if (block) {
const html = katex.renderToString(text, {
displayMode: true,
throwOnError: false,
strict: false,
});
return (
<div
className={`math-block ${className}`}
dangerouslySetInnerHTML={{ __html: html }}
/>
);
}
const tokens = text.split(/(\$\$[\s\S]+?\$\$|\$[^$\n]+?\$)/g);
return (
<span className={className}>
{tokens.map((token, idx) => {
if (token.startsWith('$$') && token.endsWith('$$') && token.length > 4) {
const expr = token.slice(2, -2).trim();
const html = katex.renderToString(expr, {
displayMode: true,
throwOnError: false,
strict: false,
});
return (
<span
key={idx}
className="math-block"
dangerouslySetInnerHTML={{ __html: html }}
/>
);
}
if (token.startsWith('$') && token.endsWith('$') && token.length > 2) {
const expr = token.slice(1, -1).trim();
const html = katex.renderToString(expr, {
displayMode: false,
throwOnError: false,
strict: false,
});
return (
<span
key={idx}
className="math-inline"
dangerouslySetInnerHTML={{ __html: html }}
/>
);
}
return <React.Fragment key={idx}>{token}</React.Fragment>;
})}
</span>
);
};
