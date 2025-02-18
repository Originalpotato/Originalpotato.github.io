// 1. Import the utilities
import {ChakraProvider, useColorMode} from "@chakra-ui/react";
import theme from "../data/themes/theme";
import type {AppProps} from 'next/app'
//import '@fontsource/press-start-2p'
//import '@fontsource/roboto/900.css';
//import '@fontsource/roboto/400.css';
//import '@fontsource/caveat/400.css';
//import '@fontsource/handlee/400.css';
//import '@fontsource/open-sans/500.css'
//import '@fontsource/open-sans/500-italic.css'
import Script from "next/script";
//import * as gtag from "../lib/gtag";
import {useRouter} from "next/router";
import {FC, useEffect} from "react";


const MyApp:FC<AppProps> = ({Component, pageProps}) =>{
    const {colorMode, toggleColorMode} = useColorMode();

    const router = useRouter();
    useEffect(() => {
        const handleRouteChange = (url) => {
            //gtag.pageview(url);
        };
        router.events.on("routeChangeComplete", handleRouteChange);
        return () => {
            router.events.off("routeChangeComplete", handleRouteChange);
        };
    }, [router.events]);

    return (
        <main>

            {/* Global Site Tag (gtag.js) - Google Analytics */}
            {/*
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXX`}
            />
            <Script
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', 'G-XXXXX', {
                                    page_path: window.location.pathname,
                            });
                        `,
                }}
            />
            */}


            <ChakraProvider theme={theme}>
                {/*@ts-ignore*/}
                <Component {...pageProps}/>
            </ChakraProvider>
        </main>
    );
}

export default MyApp;
