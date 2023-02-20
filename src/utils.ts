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

export function find_word(s: string, p: number): [number, number] {
    if (p < 1 || p > s.length || s[p-1] === " ") {
        return [0, 0];
     }

     let start = p;
     let end = p;
     while(start > 0 && s[start-1] !== " ") {
        start--;
     }
     while(end < s.length && s[end] !== " ") {
        end++;
     }

     return [start, end];
}

export function get_word(s: string, p: number): string {
    const [ start, end ] = find_word(s, p);
    return s.substring(start, end);
}

export function replace_word(s: string, p: number, r: string): string {
    const [ start, end ] = find_word(s, p);
    return s.substring(0, start) + r + (s[end] === " " ? "" : " ") + s.substring(end);
}


