import Prism from 'prismjs';
import {marked} from 'marked';
// LanguageHightlightModules
import 'prismjs/components/prism-jsx.min.js';
import 'prismjs/components/prism-typescript.min.js';
import 'prismjs/components/prism-scss.min.js';
import 'prismjs/components/prism-less.min.js';
import 'prismjs/components/prism-graphql.min.js';
import 'prismjs/components/prism-json.min.js';
import 'prismjs/components/prism-python.min.js';
import 'prismjs/components/prism-rust.min.js';
import 'prismjs/components/prism-java.min.js';
import 'prismjs/components/prism-sql.min.js';
import 'prismjs/components/prism-kotlin.min.js';
import 'prismjs/components/prism-cmake.min.js';
import 'prismjs/components/prism-c.min.js';
import 'prismjs/components/prism-cpp.min.js';
import 'prismjs/components/prism-mongodb.min.js';
import 'prismjs/components/prism-c.min.js';
import 'prismjs/components/prism-csharp.min.js';

import 'prismjs/components/prism-nginx.min.js';
import 'prismjs/components/prism-docker.min.js';
import 'prismjs/components/prism-bash.min.js';
import 'prismjs/components/prism-yaml.min.js';
import 'prismjs/components/prism-toml.min.js';
import 'prismjs/components/prism-go.min.js';

import { processRegex } from './utils';
import './mapPrismDefaultClassnames';

function highlight(language: string, code: string, cssClassnameAlias = language) {
  const html = Prism.highlight(code, Prism.languages[language], language);
  return `<div class="cc ${cssClassnameAlias}"><pre>${html}</pre></div>`;
}

function highlightRegex(...args: [string, string, ...string[]]) {
  let html = highlight(...args);
  return processRegex(html);
}

type CodeHighlighter = (text: string) => string;

// @ts-ignore FIXME: resolve types
export const comment: CodeHighlighter = (text) => `<div class="com">${marked(text)}</div>`;
export const plaincode: CodeHighlighter = (code) => {
  const html = code.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  return `<div class="cc"><pre><code>${html}</code></pre></div>`;
};

export const html: CodeHighlighter = (code) => highlight('html', code);
export const css: CodeHighlighter = (code) => highlight('css', code);
export const javascript: CodeHighlighter = (code) => highlightRegex('javascript', code, 'js');
export const react: CodeHighlighter = (code) => highlightRegex('jsx', code, 'js');
export const typescript: CodeHighlighter = (code) => highlight('typescript', code, 'js');
export const scss: CodeHighlighter = (code) => highlight('scss', code, 'css');
export const less: CodeHighlighter = (code) => highlight('less', code, 'css');
export const graphql: CodeHighlighter = (code) => highlight('graphql', code, 'gql');
export const json: CodeHighlighter = (code) => highlight('json', code);
export const python: CodeHighlighter = (code) => highlight('python', code, 'py');
export const cs: CodeHighlighter = (code) => highlight('cs', code);
export const mongo: CodeHighlighter = (code) => highlight('mongodb', code, 'mongo');
export const c: CodeHighlighter = (code) => highlight('c', code);
export const cpp: CodeHighlighter = (code) => highlight('cpp', code, 'c').replaceAll('::', '꞉꞉');
export const rust: CodeHighlighter = (code) => highlight('rust', code).replaceAll('::', '꞉꞉');
export const cmake: CodeHighlighter = (code) => highlight('cmake', code, 'c');
export const kotlin: CodeHighlighter = (code) => highlight('kotlin', code, 'java');
export const sql: CodeHighlighter = (code) => highlight('sql', code);
export const java: CodeHighlighter = (code) => highlight('java', code);
export const go: CodeHighlighter = (code) => highlight('go', code.replaceAll('\t', ' '.repeat(4)));

export const nginx: CodeHighlighter = (code) => highlight('nginx', code);
export const docker: CodeHighlighter = (code) => highlight('docker', code);
export const bash: CodeHighlighter = (code) => highlight('bash', code);
export const yaml: CodeHighlighter = (code) => highlight('yaml', code);
export const toml: CodeHighlighter = (code) => highlight('toml', code);
