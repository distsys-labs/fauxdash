import { expect } from 'vitest';
import { isObject, each } from '../src/index';

function deepCompare (partial: any, actual: any, key?: string): string[] {
  let diffs: string[] = [];
  if (actual === undefined && partial !== undefined) {
    diffs.push(`expected ${key} to equal ${partial} but was undefined`);
  } else if (isObject(partial) || Array.isArray(partial)) {
    each(partial, (v, c) => {
      const nextKey = key ? [key, c].join('.') : c;
      diffs = diffs.concat(deepCompare(partial[c], actual ? actual[c] : undefined, nextKey));
    });
  } else {
    // eslint-disable-next-line eqeqeq
    const equal = partial == actual;
    if (!equal) {
      diffs.push(`expected ${key} to equal ${partial} but got ${actual}`);
    }
  }
  return diffs;
}

expect.extend({
  async partiallyEql (received, partial) {
    const actual = await Promise.resolve(received);
    const diffs = deepCompare(partial, actual);
    return {
      pass: diffs.length === 0,
      message: () => diffs.join('\n\t')
    };
  }
});
