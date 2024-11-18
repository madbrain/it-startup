import { describe, expect, test } from 'vitest'
import { allCardTypes } from '../src/game'

describe('Game', () => {

    test('must contains the right number of cards', () => {
        const totalCount = allCardTypes.map(c => c.count).reduce((p, c) => p+c)
        expect(totalCount).toEqual(64);
    })
});