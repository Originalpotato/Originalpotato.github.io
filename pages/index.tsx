import React, {useEffect, useState} from "react";
import Layout from "../components/Layout";
import {GetStaticProps} from "next";
import {indexPageData} from "../data/indexPageData";
import IndexPageDataModel from "../interfaces/IndexPageDataModel";
import JournalModel from "../interfaces/JournalModel";

import {Box, Button, Flex, Image, Link, SimpleGrid, Text, useColorMode,} from "@chakra-ui/react";
import JournalSummary from "../components/molecules/journal/summary";
import {getAllJournal} from "../utils/mdx";
import {dateToDay, monthNumberToMonthName} from "../utils/dateUtil";
import {useRouter} from 'next/router'
import PagesHeader from "./pagesHeader";
import StarScape from "../components/molecules/starScape";
import GetCursorPos from "../hooks/useGetCursorPosition";
import VideoEmbed from "../components/molecules/videoEmbed";
import SpaceShip from "../components/molecules/spaceShip";
import PagesHeaderMenu from "./pagesHeaderMenu";

//👇 Import Open Sans font
import {Press_Start_2P} from 'next/font/google'

//👇 Configure our font object
const pressStart2P = Press_Start_2P({
    weight: '400',
    subsets: ['latin']
})


const IndexPage: React.FC<{
    indexPageData: IndexPageDataModel;
    journals: JournalModel[];
    years: number[];
    months: number[];
    monthlyTotalJournalInformation: any;
}> = ({
          indexPageData,
          journals,
          years,
          months,
          monthlyTotalJournalInformation
      }) => {

    const {colorMode, toggleColorMode} = useColorMode();
    const [selectedYear, setSelectedYear] = useState(years[0]);
    const [selectedMonth, setSelectedMonth] = useState(months[0]);
    const [filteredJournals, setFilteredJournals] = useState([] as JournalModel[]);
    const [mouseOverJournalState, setMouseOverJournalState] = useState("" as string);
    const router = useRouter()

    useEffect(() => {
        const filteredJournals = journals.filter((journal) => {
            const date = new Date(journal.frontmatter.date);
            const year = date.getFullYear();
            //const month = date.getMonth();
            //return year === selectedYear && month === selectedMonth;
            return year === selectedYear;
        })
        setFilteredJournals(filteredJournals);
    }, [journals, selectedMonth, selectedYear])


    const DEFAULT_DENSITY = 1.2;
    const DEFAULT_SIZE = 6;
    const DEFAULT_SCALE = 2;
    const DEFAULT_PROXIMITY = 0.20;


    const ImageHover = ({src}: { src: string }) => {
        return <GetCursorPos>
            {(x, y, ref) => (
                <Image
                    src={src}
                    ref={ref}
                    //fallbackSrc={whatever}
                    _hover={{
                        transform: `scale(1.5)`,
                    }}
                    transformOrigin={`${Math.floor(x * 100)}% ${Math.floor(y * 100)}%`}
                    transition="0.1s linear transform"
                    maxWidth={'min(100%, 650px)'}
                    height="auto"
                    width="auto"
                    marginInline={'auto'}
                    style={{
                        borderRadius: 20,
                        borderColor: 'white',
                        borderWidth: 2,
                        borderStyle: 'solid'
                    }}
                />
            )}
        </GetCursorPos>
    }


    return (
        <Layout title={indexPageData.pageTitle["en-US"]}>
            <PagesHeaderMenu/>

            <br/>

            <Image src='images/solarSystem.png'
                   style={{
                       position: 'absolute',
                       left: 500,
                       top: 0,
                   }}/>

            <StarScape
                densityRatio={DEFAULT_DENSITY}
                sizeLimit={DEFAULT_SIZE}
                scaleLimit={DEFAULT_SCALE}
                proximityRatio={DEFAULT_PROXIMITY}
            />


            <SpaceShip/>

            <div style={{zIndex: 999, position: 'relative'}}>

                <PagesHeader indexPageData={indexPageData}/>

                {years.length > 1 &&
                    <Flex
                        position="sticky"
                        mt={-59}
                        ml={-2}
                        mr={1}
                        p={2}>
                        {/*<Text color="primary.900"
                          alignSelf="center"
                          fontWeight={"bold"}
                          fontSize={["md", "lg", "xl", "2xl"]}
                    >Journals</Text>*/}
                        <Flex gap={1}>
                            {years.map((year, key) => {
                                const isSelectedYear = selectedYear === year;
                                return <Button
                                    key={key}
                                    colorScheme="blue"
                                    ml={5}
                                    variant={isSelectedYear ? "solid" : "link"}
                                    fontWeight={"bold"}
                                    fontSize={["md", "md", "xl", "2xl"]}
                                    fontFamily='primary'
                                    onClick={() => setSelectedYear(year)}
                                    style={{
                                        transform: 'skew(-9deg)',
                                        WebkitTransform: 'skew(-9deg)',
                                    }}
                                >
                                    {year}
                                </Button>
                            })}
                        </Flex>
                        {/*<Flex gap={2}>
                        {months.map((month) => {
                            const isSelectedMonth = selectedMonth === month;
                            return monthlyTotalJournalInformation[`${selectedYear}${month}`] && <Button
                                colorScheme="blackAlpha"
                                variant={isSelectedMonth ? "solid" : "link"}
                                fontWeight={"bold"}
                                fontSize={["md", "lg", "xl", "2xl"]}
                                onClick={() => setSelectedMonth(month)}
                            >
                                {monthNumberToMonthName(month)} ({monthlyTotalJournalInformation[`${selectedYear}${month}`].total})
                            </Button>
                        })}
                    </Flex>*/}
                    </Flex>}

                <br/>
                <br/>

                {filteredJournals.map((journal, key) => {
                    const date = dateToDay(journal.frontmatter.date);
                    const slugs = journal.slug
                    const slugPath = slugs.join('/')
                    console.log("SLUG PATH", slugPath)


                    return <Box key={key}
                                mt={2}
                                ml={1}
                        //href={`journals/${journal.slug}`}
                                style={{fontWeight: "bold", cursor: "pointer"}}
                                onMouseOver={() => setMouseOverJournalState(journal.frontmatter.date)}
                                onMouseOut={() => setMouseOverJournalState("")}
                                onFocus={() => setMouseOverJournalState(journal.frontmatter.date)}
                                onClick={(e) => {
                                    e.preventDefault();
                                    router.push(`journals/${slugPath}`)
                                }}>
                        <div className={pressStart2P.className}>
                            <JournalSummary
                                day={date.day}
                                state={mouseOverJournalState === journal.frontmatter.date ? "over" : "default"}
                                month={monthNumberToMonthName(date.month)}>

                                <Text fontSize={['xs', 'sm', 'xl', '2xl']}
                                      style={{fontWeight: 'bold'}}>{journal.frontmatter.title}</Text>
                                <SimpleGrid columns={[1, null, 2]} spacing={8} style={{marginTop: 10}}>

                                    {journal.frontmatter.cover.includes('mp4') ?

                                        <VideoEmbed src={journal.frontmatter.cover}/>

                                        :

                                        <Image src={`${journal.frontmatter.cover}`}
                                               style={{
                                                   borderRadius: 20,
                                                   borderColor: 'white',
                                                   borderWidth: 2,
                                                   borderStyle: 'solid'
                                               }}/>
                                    }

                                    <Box fontSize={['xs', 'sm', 'xl', '2xl']}>
                                        <span dangerouslySetInnerHTML={{__html: journal.frontmatter.summary}}/>
                                        &nbsp;<Link color='secondary.400' href={`journals/${slugPath}`}
                                                    style={{fontWeight: "bold"}}>{journal.frontmatter.readMore}</Link>
                                    </Box>


                                </SimpleGrid>

                            </JournalSummary>
                        </div>
                    </Box>

                })}


            </div>


        </Layout>
    )
        ;
};

/*
<div className="relative h-screen bg-black bg-opacity-75 w-1/2"/>
*/

export const getStaticProps: GetStaticProps = async () => {
    try {
        const allJournals = await getAllJournal();

        return {
            props: {
                indexPageData,
                journals: allJournals.journals,
                years: allJournals.years,
                months: allJournals.months,
                monthlyTotalJournalInformation: allJournals.monthlyTotalJournalInformation,
            }
        };
    } catch (err) {
        return {props: {errors: err.message}};
    }
};

export default IndexPage;
