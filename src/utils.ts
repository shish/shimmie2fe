export function nullthrows<T>(x: T | null | undefined): T {
    if (x === null) throw new Error("Got an unexpected null :(");
    if (x === undefined) throw new Error("Got an unexpected undefined :(");
    return x;
}
