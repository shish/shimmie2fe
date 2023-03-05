import React, { UIEvent, useState, useRef, RefObject, useEffect } from "react";

type ScrollContextType = {
    down: boolean,
    windowFull: boolean,
    nearBottom: boolean,
    bottom: boolean,
    body: RefObject<HTMLInputElement> | null,
};

export const ScrollContext = React.createContext<ScrollContextType>({
    down: false,
    windowFull: false,
    nearBottom: false,
    bottom: false,
    body: null,
});

// Using a global variable instead of useState because
// setState causes everything to be rerendered, using
// a lot of CPU
let prevScroll = 0;
export function ScrollProvider(props: any) {
    const containerRef = useRef<HTMLInputElement>(null);
    const [down, setDown] = useState(false);
    const [windowFull, setWindowFull] = useState(false);
    const [nearBottom, setNearBottom] = useState(false);
    const [bottom, setBottom] = useState(false);

    const onScroll = (event: UIEvent) => {
        const el = event.target as HTMLElement;
        setDown(el.scrollTop > prevScroll);
        prevScroll = el.scrollTop;
    };

    /*
    useEffect(() => {
        const el = containerRef?.current;
        if(el && prevScroll) {
            setWindowFull(el.scrollHeight > window.innerHeight);
            setNearBottom(el.scrollHeight - prevScroll <= el.clientHeight * 2);
            setBottom(el.scrollHeight - prevScroll === el.clientHeight);
        }
    }, [containerRef.current?.scrollHeight, prevScroll, window.innerHeight])
    console.log(containerRef.current?.scrollHeight, prevScroll, window.innerHeight);
    */

    return (
        <ScrollContext.Provider value={{ down, windowFull, nearBottom, bottom, body: containerRef }}>
            <div className={props.className} onScroll={onScroll} ref={containerRef}>
                {props.children}
            </div>
        </ScrollContext.Provider>
    );
}
