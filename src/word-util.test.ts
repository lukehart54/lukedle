import { describe, expect, it } from 'vitest';
import { computeGuess, getRandomWord, LetterState } from './word-utils';

describe('word-utils', () => {
  it('random word', () => {
    expect(getRandomWord().length).toEqual(5);
  });
});

describe('computeGuess', () => {
  it('it works with match and present', () => {
    expect(computeGuess('boost', 'basic')).toEqual([
      LetterState.Match,
      LetterState.Wrong,
      LetterState.Wrong,
      LetterState.Present,
      LetterState.Wrong,
    ]);
  });

  it('it works with all matches', () => {
    expect(computeGuess('boost', 'boost')).toEqual([
      LetterState.Match,
      LetterState.Match,
      LetterState.Match,
      LetterState.Match,
      LetterState.Match,
    ]);
  });

  it('it works with all matches', () => {
    expect(computeGuess('guard', 'boost')).toEqual([
      LetterState.Wrong,
      LetterState.Wrong,
      LetterState.Wrong,
      LetterState.Wrong,
      LetterState.Wrong,
    ]);
  });

  it('it works with all matches', () => {
    expect(computeGuess('solid', 'boost')).toEqual([
      LetterState.Present,
      LetterState.Match,
      LetterState.Wrong,
      LetterState.Wrong,
      LetterState.Wrong,
    ]);
  });
});
