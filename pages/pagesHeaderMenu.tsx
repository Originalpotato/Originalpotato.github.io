import {Box, Button, Flex, Link, SimpleGrid, Text} from "@chakra-ui/react";
import packageJson from "../package.json";
import React from "react";
import {FaSteam} from "react-icons/fa";

const PagesHeaderMenu = () => {
    return (
        <Flex m={2} justifyContent={"space-between"}>
            <SimpleGrid
                columns={[1, null, 4]}
                spacing={1}
                textAlign="center"
                zIndex={99999}>


                <Button
                    leftIcon={<FaSteam style={{fontSize: 30, color: '#2a475e'}}/>}>
                    <Link href='https://store.steampowered.com/app/2726860/Interstellar_Inn/'
                          isExternal>
                        Follow Us on the Steam Store
                    </Link>
                </Button>

            </SimpleGrid>




            {/*<Box>
                <Text
                    fontSize={["md", "lg", "xl", "2xl"]}
                    fontFamily={"caveat"}
                    right={"0px"}
                    top={"-10px"}
                    transform={"rotate(-10deg)"}
                    color="white"
                >
                    V{packageJson.version}
                </Text>
            </Box>*/}
        </Flex>
    )
}

export default PagesHeaderMenu;