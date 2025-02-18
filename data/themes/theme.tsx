import {extendTheme} from '@chakra-ui/react';


const h1 = {
    fontSize: ['xl', '2xl', '4xl', '6xl'],
    fontFamily: "primary",
    fontWeight: 600,
    color: "primary.900",
    marginBottom: "10px",
    marginTop: "10px",
}

const colors = {
    secondary: {
        400: "#4299E1",
    }
}

export const themeOverride = {
    breakpoints: {
        sm: "320px",
        md: "768px",
        lg: "960px",
        xl: "1200px",
        "2xl": "1536px",
    },
    fonts: {
        caveat: "Caveat",
        primary: "'Press Start 2P'",
        secondary: "Handlee",
    },
    textStyles: {
        h1,
    },
    fontSizes: {
        "2xs": "0.50rem",
        xs: "0.75rem",
        sm: "0.875rem",
        md: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "3.75rem",
        "7xl": "4.5rem",
        "8xl": "6rem",
        "9xl": "8rem",
    },
    colors: {
        transparent: "transparent",
        black: "#000",
        white: "#F7F5F0",
        primary: {
            50: "#18181b",
            400: "#1A202C",
            600: "#475569",
            800: "#94a3b8",
            900: "#F7FAFC",
        },
        secondary: {
            400: colors.secondary["400"],
        },
    },
    config: {
        initialColorMode: "light",
        useSystemColorMode: false
    },
    styles: {
        global: {
            '.mdx-prose': {
                blockquote: {
                    fontSize: "1.4em",
                    width: "90%",
                    margin: "50px auto",
                    fontStyle: "italic",
                    color: "white",
                    padding: "1.2em 30px 1.2em 75px",
                    borderLeft: `8px solid ${colors.secondary["400"]}`,
                    lineHeight: "1.6",
                    position: "relative",
                    background: "#EDEDED",
                },
                "blockquote span": {
                    display: "block",
                    color: "#333333",
                    fontStyle: "normal",
                    fontWeight: "bold",
                    marginTop: "1em",
                },
                "blockquote::before": {
                    fontFamily: "Arial",
                    content: `"\\201C"`,
                    color: "black",
                    fontSize: "4em",
                    position: "absolute",
                    left: "10px",
                    top: "-10px",
                },

                "blockquote::after": {
                    content: `""`,
                },
                h1,
                h2: {
                    fontSize: '3xl',
                    mb: '4',
                },
                h3: {
                    fontSize: '2xl',
                    mb: '4',
                },
                p: {
                    fontSize: ['md', 'lg', 'xl', '2xl'],
                    m: 4,
                    alignSelf: "center",
                    fontFamily: "primary",
                    fontWeight: 400,

                },
                ul: {
                    margin: "revert",
                    padding: "revert",
                    fontSize: ['md', 'lg', 'xl', '2xl'],
                    ml: '4',
                    alignSelf: "center",
                    fontFamily: "primary",
                    fontWeight: 400,
                    mt: -2,
                    mr: '4'
                },
                ol: {
                    margin: "revert",
                    padding: "revert",
                    fontSize: ['md', 'lg', 'xl', '2xl'],
                    ml: '4',
                    alignSelf: "center",
                    fontFamily: "primary",
                    fontWeight: 400,
                    mt: -2,
                    mr: '4'
                },
                a: {
                    color: "secondary.400",
                    fontWeight: "bold",
                },
                code: {
                    mb: 5,
                    rounded: 10,
                    boxShadow: "0.5px 0.5px 2px grey inset",
                }
            },
        }
    }
};


const theme = extendTheme(
    themeOverride
);

export default theme;
