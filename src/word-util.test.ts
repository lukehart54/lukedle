import { describe, expect, it } from 'vitest';
import { computeGuess, word, LetterState } from './word-utils';

describe('word-utils', () => {
  it('random word', () => {
    expect(word.length).toEqual(5);
  });
});

describe('computeGuess', () => {
  it('it works with match and present', () => {
    expect(computeGuess('boost', 'basic')).toEqual([
      LetterState.Match,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Present,
      LetterState.Miss,
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
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
    ]);
  });

  it('it works with all matches', () => {
    expect(computeGuess('solid', 'boost')).toEqual([
      LetterState.Present,
      LetterState.Match,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
    ]);
  });

  test('when answer has two letters present but answer only has one of those letters', () => {
    expect(computeGuess('allol', 'smelt')).toEqual([
      LetterState.Miss,
      LetterState.Present,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
    ]);
  });
});

  test('when 1 letter matches but guess has more of the same letter', () => {
    expect(computeGuess('allol', 'colon')).toEqual([
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Match,
      LetterState.Match,
      LetterState.Miss,
    ]);
  });

    test('returns empty array when given incomplete guess', () => {
      expect(computeGuess('so', 'boost')).toEqual([]);
    });
