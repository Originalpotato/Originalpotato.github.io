import React from "react";
import {Text} from "@chakra-ui/react";

interface JournalTextProps {
    children: React.ReactNode;
}

const JournalText: React.FC<JournalTextProps> = ({children}) => {

    return (
        <Text
            fontSize={["md", "lg", "xl", "2xl"]}
            ml={4}
            alignSelf={"center"}
            fontFamily={"primary"}
            fontWeight={400}
            mt={-1}
        >
            {children}
        </Text>
    );
};

export default JournalText;
