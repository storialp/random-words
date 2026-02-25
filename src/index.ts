#!/usr/bin/env node

import { randomWords } from './words.js';

const args: string[] = process.argv.slice(2);
let count: number = 4;
let separator: string = '-';
let format: string = 'joined';

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg === '-n' || arg === '--count') {
    const nextArg = args[++i];
    if (!nextArg || isNaN(parseInt(nextArg))) {
      console.error('Error: --count requires a valid number');
      process.exit(1);
    }
    count = parseInt(nextArg);
    if (count < 1 || count > 1000) {
      console.error('Error: count must be between 1 and 1000');
      process.exit(1);
    }
  } else if (arg === '-s' || arg === '--separator') {
    separator = args[++i];
    if (separator === undefined) {
      console.error('Error: --separator requires a value');
      process.exit(1);
    }
  } else if (arg === '-f' || arg === '--format') {
    format = args[++i] || 'joined';
    if (!['joined', 'array', 'newline'].includes(format)) {
      console.error('Error: format must be one of: joined, array, newline');
      process.exit(1);
    }
  } else if (arg === '-h' || arg === '--help') {
    console.log(`Usage: random-words [options]

Options:
  -n, --count <number>    Number of words to generate (default: 4)
  -s, --separator <char>  Separator between words (default: -)
  -f, --format <type>     Output format: joined, array, or newline (default: joined)
  -h, --help              Show this help message

Examples:
  random-words
  random-words -n 6
  random-words -n 3 -s _
  random-words -n 2 -f array`);
    process.exit(0);
  } else if (!arg.startsWith('-')) {
    const val = parseInt(arg);
    if (!isNaN(val)) {
      if (val < 1 || val > 1000) {
        console.error('Error: count must be between 1 and 1000');
        process.exit(1);
      }
      count = val;
    }
  }
}

const words: string[] = randomWords(count);

if (format === 'array') {
  console.log(JSON.stringify(words));
} else if (format === 'newline') {
  console.log(words.join('\n'));
} else {
  console.log(words.join(separator));
}
