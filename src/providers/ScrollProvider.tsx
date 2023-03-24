import React, { UIEvent, useState, useEffect } from "react";

type ScrollContextType = {
    down: boolean;
    windowFull: boolean;
    nearBottom: boolean;
    bottom: boolean;
    scrollContentRef: ((node: any) => void) | null;
};

export const ScrollContext = React.createContext<ScrollContextType>({
    down: false,
    windowFull: false,
    nearBottom: false,
    bottom: false,
    scrollContentRef: null,
});

// Using a global variable instead of useState because
// setState causes everything to be rerendered, using
// a lot of CPU
let prevScroll = 0;
export function ScrollProvider(props: any) {
    const [down, setDown] = useState(false);
    const [windowFull, setWindowFull] = useState(false);
    const [nearBottom, setNearBottom] = useState(false);
    const [bottom, setBottom] = useState(false);

    // Ideally, we would observe the parent's clientHeight
    // and the parent's scrollHeight; but scrollHeight can't
    // be observed, so we observe the parent and the child's
    // clientHeights and assume that
    // parent.scrollHeight = child.clientHeight
    const [parent, setParent] = useState<HTMLDivElement | null>(null);
    const [child, setChild] = useState<HTMLDivElement | null>(null);
    function somethingResized() {
        // console.log("something resized", parent, child);
        if (parent && child) {
            // console.log(parent.clientHeight, child.clientHeight)
            setWindowFull(child.clientHeight > parent.clientHeight);
            setNearBottom(
                parent.scrollHeight - parent.scrollTop <=
                    parent.clientHeight * 2,
            );
            setBottom(
                parent.scrollHeight - parent.scrollTop === parent.clientHeight,
            );
            /*
            console.log(
                "something resized", //parent, child,
                "full:", child.clientHeight > parent.clientHeight,
                "nb:", parent.scrollHeight - parent.scrollTop <= parent.clientHeight * 2,
                "b:", parent.scrollHeight - parent.scrollTop === parent.clientHeight
            );
            */
        }
    }
    useEffect(() => {
        if (parent) {
            const obs = new ResizeObserver(somethingResized);
            obs.observe(parent);
            return () => {
                obs.unobserve(parent);
            };
        }
    }, [parent]);
    useEffect(() => {
        if (child) {
            const obs = new ResizeObserver(somethingResized);
            obs.observe(child);
            return () => {
                obs.unobserve(child);
            };
        }
    }, [child]);

    const onScroll = (event: UIEvent) => {
        const el = event.target as HTMLElement;
        setDown(el.scrollTop > prevScroll);
        setNearBottom(el.scrollHeight - el.scrollTop <= el.clientHeight * 2);
        setBottom(el.scrollHeight - el.scrollTop === el.clientHeight);
        prevScroll = el.scrollTop;
    };

    return (
        <ScrollContext.Provider
            value={{
                down,
                windowFull,
                nearBottom,
                bottom,
                scrollContentRef: setChild,
            }}
        >
            <div
                className={props.className}
                onScroll={onScroll}
                ref={setParent}
            >
                {props.children}
            </div>
        </ScrollContext.Provider>
    );
}
