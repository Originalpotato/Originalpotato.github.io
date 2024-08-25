import React, {useEffect, useRef} from 'react'
import {Box} from "@chakra-ui/react";

const VideoEmbed = ({ src }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        // Clean up function to stop the video
        return () => {
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
            }
        };
    }, []);

    return (
        <Box
            as="video"
            ref={videoRef}
            src={src}
            width="100%"
            sx={{ aspectRatio: '16/9' }}
            controls
        />
    );
};

export default VideoEmbed