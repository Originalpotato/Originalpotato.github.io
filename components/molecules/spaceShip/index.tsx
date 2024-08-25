import React, { useEffect, useState } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { Box } from '@chakra-ui/react';
import useSound from 'use-sound';

const spaceshipSound = 'sounds/spaceShips/ship-1.mp3'; // Ensure this path is correct

const spaceshipImages = [
    'images/spaceShips/ship-1.png',
    'images/spaceShips/ship-2.png',
    'images/spaceShips/ship-3.png',
    'images/spaceShips/ship-4.png',
    'images/spaceShips/ship-5.png',
    'images/spaceShips/ship-6.png',
    'images/spaceShips/ship-7.png',
    'images/spaceShips/ship-8.png',
    'images/spaceShips/ship-9.png',
    'images/spaceShips/ship-10.png',
    'images/spaceShips/ship-11.png',
    'images/spaceShips/ship-12.png',
    'images/spaceShips/ship-13.png',
];

const getRandomOutsidePosition = () => ({
    x: '-10vw',
    y: `${Math.random() * 100}vh`,
});

const getRandomInsidePosition = () => ({
    x: '110vw',
    y: `${Math.random() * 100}vh`,
});

const getRandomScale = () => (Math.random() > 0.5 ? 0.5 : 1.5);

const Spaceship = () => {
    //const [play, { stop, sound }] = useSound(spaceshipSound, { volume: 0.05, interrupt: true });
    const [styles, api] = useSpring(() => ({
        from: { transform: 'translate3d(0%, 0%, 0) scale(0)', opacity: 0 },
    }));

    const [spaceshipImage, setSpaceshipImage] = useState(spaceshipImages[0]);

    useEffect(() => {
        const animate = () => {
            const { x: startX, y: startY } = getRandomOutsidePosition();
            const { x: endX, y: endY } = getRandomInsidePosition();
            const fromScale = getRandomScale();
            const toScale = fromScale === 0.5 ? 1.5 : 0.5;

            // Set animation duration to match sound duration
            //const soundDuration = sound.duration() * 1000; // duration in milliseconds

            // Randomly choose a spaceship image
            const randomSpaceshipImage = spaceshipImages[Math.floor(Math.random() * spaceshipImages.length)];
            setSpaceshipImage(randomSpaceshipImage);

            const isHuge = Math.random() > 0.7; // 30% chance to appear huge
            const initialScale = isHuge ? 3 : fromScale;
            const finalScale = isHuge ? 1 : toScale;
            const initialOpacity = isHuge ? 0 : 1;
            const finalOpacity = isHuge ? 1 : 0;

            api.start({
                from: { transform: `translate3d(${startX}, ${startY}, 0) scale(${initialScale})`, opacity: initialOpacity },
                to: { transform: `translate3d(${endX}, ${endY}, 0) scale(${finalScale})`, opacity: finalOpacity },
                config: { duration: 5000},//soundDuration },
                onStart: () => {
                    //play();
                },
                onRest: () => {
                    //stop();
                    setTimeout(animate, Math.random() * 2000 + 1000); // Random delay between 1000ms and 3000ms
                },
            });
        };

        // Play the sound once to get its duration
        //play();

        // Wait for the sound to load and get its duration
        const interval = setInterval(() => {
            //if (sound && sound.duration() > 0) {
                clearInterval(interval);
                animate();
            //}
        }, 100);

        return () => {
            clearInterval(interval);
        };
    }, [api]) //play, stop, sound]);

    return (
        <Box position="fixed" top="0" left="0" width="100vw" height="100vh" pointerEvents="none" overflow="hidden">
            <animated.div style={styles}>
                <Box
                    as="img"
                    src={spaceshipImage}
                    alt="Spaceship"
                    width="100px"
                    height="auto"
                />
            </animated.div>
        </Box>
    );
};

export default Spaceship;
