export const serverInfo = {
    name: "My Site",
    // root: "https://rule34.paheal.net",
    root: "http://127.0.0.1:8000",
};

export function absurl(path: string): string {
    if (path.startsWith("http")) {
        return path;
    }
    return serverInfo.root + path;
}

export function bbcode(text: string): string {
    return `<bbcode>${text}</bbcode>`;
}