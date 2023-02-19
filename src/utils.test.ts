import * as u from './utils';

describe('get_word', () => {
    test('start', () => {
        expect(u.get_word("hello", 0)).toEqual("");
    });
    test('middle', () => {
        expect(u.get_word("hello", 3)).toEqual("hello");
    });
    test('end', () => {
        expect(u.get_word("hello", 5)).toEqual("hello");
    });
    test('too small', () => {
        expect(u.get_word("hello", -1)).toEqual("");
    });
    test('too large', () => {
        expect(u.get_word("hello", 6)).toEqual("");
    });
    test('start of second word', () => {
        expect(u.get_word("hello world", 6)).toEqual("");
    });
});

describe('replace_word', () => {
    test('start', () => {
        expect(u.replace_word("hello world", 0, "cake")).toEqual("cake hello world");
    });
    test('middle 1', () => {
        expect(u.replace_word("hello world", 3, "cake")).toEqual("cake world");
    });
    test('middle 2', () => {
        expect(u.replace_word("hello world", 9, "cake")).toEqual("hello cake ");
    });
    test('end', () => {
        expect(u.replace_word("hello world", 11, "cake")).toEqual("hello cake ");
    });
});

