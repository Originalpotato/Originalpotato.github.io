import {Box, Flex, Image, Text} from "@chakra-ui/react";
import React from "react";

interface PagesHeaderProps{
    indexPageData:any
}

const PagesHeader = ({
    indexPageData,
                     }:PagesHeaderProps) => {
    return(
            <Flex style={{justifyContent: 'center', marginBottom: 40, zIndex: 999, position: 'relative'}}>
                {/*<Image
                    src={`./images/${indexPageData.image}`}
                    alt={indexPageData.name["en-US"]}
                    boxSize={"60%"}
                />*/}
            </Flex>
    )
}

export default PagesHeader