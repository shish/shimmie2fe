import React from "react";

export function BBCode(props: { children: string }) {
    let html = props.children;
    html = html.replace(/&/g, "&amp;")
    html = html.replace(/</g, "&lt;")
    html = html.replace(/>/g, "&gt;")

    html = html.replace(/\[code\](.*?)\[\/code\]/sg, (m, c) => {return "[code!]"+btoa(c)+"[/code!]"})

    // things which might appear nested
    for(let n=0; n<5; n++) {
        html = html.replace(/\[(b|i|u|s|sup|sub|h1|h2|h3|h4|li|ul|ol)\](.*?)\[\/\1\]/sg, "<$1>$2</$1>")
        html = html.replace(/\[(list)\](.*?)\[\/\1\]/sg, "<ul>$2</ul>")
        html = html.replace(/\[anchor=(.*?)\](.*?)\[\/anchor\]/g, '<span class="anchor">$2 <a class="alink" href="#bb-$1" id="bb-$1" title="link to this anchor"> ¶ </a></span>');  // add "bb-" to avoid clashing with eg #top
        html = html.replace(/\[url=site:\/\/(.*?)(#c\d+)?\](.*?)\[\/url\]/sg, '<a class="shm-clink" data-clink-sel="$2" href="/$1$2">$3</a>');
        html = html.replace(/\[url\]site:\/\/(.*?)(#c\d+)?\[\/url\]/sg, '<a class="shm-clink" data-clink-sel="$2" href="/$1$2">$1$2</a>');
        html = html.replace(/\[url=((?:https?|ftp|irc|mailto):\/\/.*?)\](.*?)\[\/url\]/g, '<a href="$1">$2</a>');
        html = html.replace(/\[url\]((?:https?|ftp|irc|mailto):\/\/.*?)\[\/url\]/g, '<a href="$1">$1</a>');
        html = html.replace(/\[email\](.*?)\[\/email\]/g, '<a href="mailto:$1">$1</a>');
        html = html.replace(/\[img\](https?:\/\/.*?)\[\/img\]/g, '<img alt="user image" src="$1">');
        html = html.replace(/\[quote\](.*?)\[\/quote\]/sg, "<blockquote><small>$1</small></blockquote>");
        html = html.replace(/\[quote=(.*?)\](.*?)\[\/quote\]/sg, "<blockquote><em>$1 said:</em><br><small>$2</small></blockquote>");
        html = html.replace(/\[spoiler\](.*?)\[\/spoiler\]/sg, "<span style=\"background-color: black; color: black;\">$1</span>");    
    }

    html = html.replace(/\[\[([^\|\]]+)\|([^\]]+)\]\]/sg, '<a href="/wiki/$1">$2</a>');
    html = html.replace(/\[\[([^\]]+)\]\]/sg, '<a href="/wiki/$1">$1</a>');
    html = html.replace(/^&gt;&gt;([^\d].+)!/, '<blockquote><small>$1</small></blockquote>');
    html = html.replace(/&gt;&gt;(\d+)(#c?\d+)?/s, '<a class="shm-clink" data-clink-sel="$2" href="/post/$1$2">&gt;&gt;$1$2</a>');
    html = html.replace(/\n\s*\n/sg, "\n\n");
    html = html.replace(/\n/g, "\n<br/>");

    html = html.replace(/\[\*\]/g, "<li/>");
    html = html.replace(/<br\/><(li|ul|ol|\/ul|\/ol)>/s, "<\\1>");
    html = html.replace(/\[align=(left|center|right)\](.*?)\[\/align\]/s, "<div style='text-align:\\1;'>\\2</div>");

    html = html.replace(/\[code!\](.*?)\[\/code!\]/sg, (m, c) => {return "<pre>"+atob(c)+"</pre>"})

    return <span style={{overflowWrap: "anywhere"}} dangerouslySetInnerHTML={{__html: html}} />;
}
