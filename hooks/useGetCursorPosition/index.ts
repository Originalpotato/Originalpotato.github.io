import {useEffect, useRef, useState} from "react";

const GetCursorPos = ({
                          children,
                      }: {
    children: (
        xPos: number,
        yPos: number,
        ref: React.MutableRefObject<HTMLImageElement | null>
    ) => React.ReactElement;
}) => {
    const [pos, setPos] = useState([0, 0]);
    const ref = useRef<HTMLImageElement | null>(null);

    const updatePos = (e: MouseEvent) => {
        if (ref.current) {
            const y =
                1 - (ref.current.offsetHeight + ref.current.offsetTop - e.clientY) /
                ref.current.offsetHeight;
            const x =
                1 - (ref.current.offsetWidth + ref.current.offsetLeft - e.clientX) /
                ref.current.offsetWidth;
            setPos([x, y]);
        }
    };

    useEffect(() => {
        if (ref.current) {
            ref.current.addEventListener('mousemove', updatePos);
        }
        return () => {
            if (ref.current) {
                ref.current.removeEventListener('mousemove', updatePos);
            }
        };
    });

    return children(pos[0], pos[1], ref);
};

export default GetCursorPos