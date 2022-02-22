import {describe, expect, it} from 'vitest';
import { getRandomWord } from './word-utils';


describe('word-utils', () => {
    it('random word', () => {
        expect(getRandomWord()).toEqual('sugar');
    });
});