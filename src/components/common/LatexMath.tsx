import React, { useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface LatexMathProps {
  math: string;
  displayMode?: boolean;
  className?: string;
}

/**
 * Normalizes mathematical formulas that may contain mixed Unicode, fractions, or plain ASCII
 * into clean standard LaTeX for KaTeX.
 */
function normalizeLatex(input: string): string {
  if (!input) return '';
  let s = input.trim();

  // Replace unicode mathematical operators with LaTeX equivalents
  s = s.replace(/→/g, '\\to ');
  s = s.replace(/∑/g, '\\sum ');
  s = s.replace(/∫/g, '\\int ');
  s = s.replace(/∞/g, '\\infty ');
  s = s.replace(/⇔/g, '\\iff ');
  s = s.replace(/⇒/g, '\\implies ');
  s = s.replace(/≤/g, '\\le ');
  s = s.replace(/≥/g, '\\ge ');
  s = s.replace(/·/g, '\\cdot ');
  s = s.replace(/α/g, '\\alpha ');
  s = s.replace(/β/g, '\\beta ');
  s = s.replace(/λ/g, '\\lambda ');
  s = s.replace(/μ/g, '\\mu ');
  s = s.replace(/γ/g, '\\gamma ');

  // Fix unescaped standard functions
  s = s.replace(/(^|[^\\a-zA-Z])lim_\{/g, '$1\\lim_{');
  s = s.replace(/(^|[^\\a-zA-Z])dim\(/g, '$1\\dim(');
  s = s.replace(/(^|[^\\a-zA-Z])ker\(/g, '$1\\ker(');
  s = s.replace(/(^|[^\\a-zA-Z])max\(/g, '$1\\max(');

  // Turn ||x|| into \|x\| for standard norm rendering
  s = s.replace(/\|\|/g, '\\|');

  return s;
}

export const LatexMath: React.FC<LatexMathProps> = ({
  math,
  displayMode = false,
  className = '',
}) => {
  const html = useMemo(() => {
    try {
      const normalized = normalizeLatex(math);
      return katex.renderToString(normalized, {
        displayMode,
        throwOnError: false,
        strict: false,
      });
    } catch {
      return math;
    }
  }, [math, displayMode]);

  return (
    <span
      className={`inline-math-container select-text ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
