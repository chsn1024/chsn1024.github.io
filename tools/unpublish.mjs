#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const input = process.argv[2];

if (!input || input === '-h' || input === '--help') {
  console.log('Usage: npm run post:unpublish -- <filename.md>');
  process.exit(input ? 0 : 1);
}

const cwd = process.cwd();
const from = path.join(cwd, 'source', '_posts', input);
const toDir = path.join(cwd, 'source', '_drafts');
const to = path.join(toDir, path.basename(input));

if (!fs.existsSync(from)) {
  console.error(`Post not found: ${from}`);
  process.exit(1);
}

if (!fs.existsSync(toDir)) {
  fs.mkdirSync(toDir, { recursive: true });
}

if (fs.existsSync(to)) {
  console.error(`Draft already exists: ${to}`);
  process.exit(1);
}

fs.renameSync(from, to);
console.log(`Unpublished: ${input} -> source/_drafts/${path.basename(input)}`);
