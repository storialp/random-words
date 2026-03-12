import { randomInt } from 'node:crypto';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const words = require('an-array-of-english-words') as string[];

/**
 * Returns a list of random words.
 * This is now more efficient for large lists by picking individual random indices
 * instead of shuffling the entire array.
 * 
 * @param count Number of words to return
 * @returns Array of random words
 */
export function randomWords(count: number = 4): string[] {
  const n = words.length;
  const actualCount = Math.max(0, Math.min(count, n));
  
  if (actualCount === 0) return [];

  const result: string[] = [];
  const seenIndices = new Set<number>();

  // For small counts, we use a Set to pick unique indices.
  // This is O(count) instead of O(N) where N is the total number of words (275,000+).
  while (result.length < actualCount) {
    const j = randomInt(0, n);
    if (!seenIndices.has(j)) {
      seenIndices.add(j);
      result.push(words[j]);
    }
  }

  return result;
}

export { words };
