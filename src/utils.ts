import { serverInfo } from "./App";

export function nullthrows<T>(x: T | null | undefined): T {
    if (x === null) throw new Error("Got an unexpected null :(");
    if (x === undefined) throw new Error("Got an unexpected undefined :(");
    return x;
}

export function absurl(path: string): string {
    if (path.startsWith("http")) {
        return path;
    }
    return serverInfo.root + path;
}

export function bbcode(text: string): string {
    return `<bbcode>${text}</bbcode>`;
}