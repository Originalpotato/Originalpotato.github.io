import React from 'react'
import gsap from "gsap";
import useWindowSize from "../../../hooks/useWindowSize";


const StarScape = ({
                       densityRatio = 0.5,
                       sizeLimit = 5,
                       defaultAlpha = 0.2,
                       scaleLimit = 2,
                       proximityRatio = 0.1
                   }) => {
    const canvasRef = React.useRef(null);
    const contextRef = React.useRef(null);
    const starsRef = React.useRef(null);
    const vminRef = React.useRef(null);
    const scaleMapperRef = React.useRef(null);
    const alphaMapperRef = React.useRef(null);
    const codeRef = React.useRef([]);
    const partyRef = React.useRef(null);

    const KONAMI_CODE =
        "arrowup,arrowup,arrowdown,arrowdown,arrowleft,arrowright,arrowleft,arrowright,keyb,keya";
    //const AUDIO = new Audio("https://assets.codepen.io/605876/sparkle.mp3");


    const isPartying = () =>
        partyRef.current &&
        partyRef.current.progress() !== 0 &&
        partyRef.current.progress() !== 1;

    React.useEffect(() => {
        contextRef.current = canvasRef.current.getContext("2d");
        const LOAD = () => {
            vminRef.current = Math.min(window.innerHeight, window.innerWidth);
            const STAR_COUNT = Math.floor(vminRef.current * densityRatio);
            scaleMapperRef.current = gsap.utils.mapRange(
                0,
                vminRef.current * proximityRatio,
                scaleLimit,
                1
            );
            alphaMapperRef.current = gsap.utils.mapRange(
                0,
                vminRef.current * proximityRatio,
                1,
                defaultAlpha
            );
            canvasRef.current.width = window.innerWidth;
            canvasRef.current.height = window.innerHeight;
            starsRef.current = new Array(STAR_COUNT).fill().map(() => ({
                hue: 0,
                saturation: 0,
                lightness: 100,
                x: gsap.utils.random(0, window.innerWidth, 1),
                y: gsap.utils.random(0, window.innerHeight, 1),
                size: gsap.utils.random(1, sizeLimit, 1),
                scale: 1,
                alpha: defaultAlpha
            }));
        };
        const RENDER = () => {
            contextRef.current.clearRect(
                0,
                0,
                canvasRef.current.width,
                canvasRef.current.height
            );
            starsRef.current.forEach((star) => {
                contextRef.current.fillStyle = `hsla(${star.hue}, ${star.saturation}%, ${star.lightness}%, ${star.alpha})`;
                contextRef.current.beginPath();
                contextRef.current.arc(
                    star.x,
                    star.y,
                    (star.size / 2) * star.scale,
                    0,
                    Math.PI * 2
                );
                contextRef.current.fill();
            });
        };

        const UPDATE = ({x, y}) => {
            if (!isPartying()) {
                starsRef.current.forEach((STAR) => {
                    const DISTANCE = Math.sqrt(
                        Math.pow(STAR.x - x, 2) + Math.pow(STAR.y - y, 2)
                    );
                    gsap.to(STAR, {
                        scale: scaleMapperRef.current(
                            Math.min(DISTANCE, vminRef.current * proximityRatio)
                        ),
                        alpha: alphaMapperRef.current(
                            Math.min(DISTANCE, vminRef.current * proximityRatio)
                        )
                    });
                });
            }
        };

        const EXIT = () => {
            gsap.to(starsRef.current, {
                scale: 1,
                alpha: defaultAlpha
            });
        };

        LOAD();
        gsap.ticker.fps(24);
        gsap.ticker.add(RENDER);

        // Set up event handling
        window.addEventListener("resize", LOAD);
        document.addEventListener("pointermove", UPDATE);
        document.addEventListener("pointerleave", EXIT);
        return () => {
            window.removeEventListener("resize", LOAD);
            document.removeEventListener("pointermove", UPDATE);
            document.removeEventListener("pointerleave", EXIT);
            gsap.ticker.remove(RENDER);
        };
    }, []);

    React.useEffect(() => {
        const handleCode = (e) => {
            codeRef.current = [...codeRef.current, e.code].slice(
                codeRef.current.length > 9 ? codeRef.current.length - 9 : 0
            );
            if (
                codeRef.current.join(",").toLowerCase() === KONAMI_CODE &&
                !isPartying()
            ) {
                codeRef.current.length = 0;
                partyRef.current = gsap.timeline().to(starsRef.current, {
                    scale: 1,
                    alpha: defaultAlpha,
                    //onComplete: () => AUDIO.play(),
                });
                const STAGGER = 0.01;

                for (let s = 0; s < starsRef.current.length; s++) {
                    partyRef.current
                        .to(
                            starsRef.current[s],
                            {
                                onStart: () => {
                                    gsap.set(starsRef.current[s], {
                                        hue: gsap.utils.random(0, 360),
                                        saturation: 80,
                                        lightness: 60,
                                        alpha: 1,
                                    })
                                },
                                onComplete: () => {
                                    gsap.set(starsRef.current[s], {
                                        saturation: 0,
                                        lightness: 100,
                                        alpha: defaultAlpha,
                                    })
                                },
                                x: gsap.utils.random(0, window.innerWidth),
                                y: gsap.utils.random(0, window.innerHeight),
                                duration: 0.3
                            },
                            s * STAGGER
                        );
                }
            }
        };
        window.addEventListener("keyup", handleCode);
        return () => {
            window.removeEventListener("keyup", handleCode);
        };
    }, []);


    const {height} = useWindowSize()

    return  <canvas ref={canvasRef}
                    style={{position: 'absolute', left: 0, top: 0, zIndex: 1, height}}
    onMouseOver={(event) =>  event.preventDefault()}/>
};

export default StarScape