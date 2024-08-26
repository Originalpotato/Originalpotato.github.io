// @ts-nocheck

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {bundleMDX} from "mdx-bundler";
import JournalModel from "../interfaces/JournalModel";
import {DateTime} from 'luxon';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc'
import rehypeHighlight from "rehype-highlight";
import {PortfolioModel} from "../interfaces/JournalModel";
import {journalUtilGetJournalsByYearsWithMonths} from "./journalUtil";
import {monthNumberToMonthName} from "./dateUtil";

export const ROOT = process.cwd();
export const JOURNALS_PATH = path.join(process.cwd(), "./data/content/journals");
export const PORTFOLIOS_PATH = path.join(process.cwd(), "./data/content/portfolios");

const getCompiledMDX = async (source: string) => {

    if (process.platform === "win32") {
        process.env.ESBUILD_BINARY_PATH = path.join(
            ROOT,
            "node_modules",
            "esbuild",
            "esbuild.exe"
        );
    } else {
        process.env.ESBUILD_BINARY_PATH = path.join(
            ROOT,
            "node_modules",
            "esbuild",
            "bin",
            "esbuild"
        );
    }
    // Add your remark and rehype plugins here
    const remarkPlugins = [remarkGfm, [remarkToc, {tight: true, ordered: true}]];
    const rehypePlugins = [rehypeHighlight];

    return await bundleMDX({
        source, xdmOptions: (options) => {
            // @ts-ignore
            options.remarkPlugins = [
                ...(options.remarkPlugins ?? []),
                ...remarkPlugins,
            ];
            options.rehypePlugins = [
                ...(options.rehypePlugins ?? []),
                ...rehypePlugins,
            ];

            return options;
        },
    });

};

export const getSingleJournal = async (slugs: string[]) => {
    console.log("--> getSingleJournal.slugs", slugs)
    const slugPath = `${JOURNALS_PATH}/${slugs.join('/')}.mdx`;
    console.log("--> getSingleJournal.slugPath", slugPath)
    const source = getFileContent(slugPath);
    const {code, frontmatter} = await getCompiledMDX(source);

    return {
        frontmatter,
        code,
    };
};

export const getAllJournal = async () => {
    console.log("--> getAllJournal")
    const years = new Set();
    const months = new Set();
    const monthlyTotalJournalInformation = {};

    const journals: JournalModel[] = fs
        .readdirSync(JOURNALS_PATH,{
            recursive: true
        })
        //@ts-ignore
        .filter((path) => /\.mdx?$/.test(path))
        .map((fileName) => {
            const source = getFileContent(getSlugPath(fileName));
            console.log('->', matter(source))

            const {data} = matter(source);

            const time = data.time;
            const date = new Date(data.date);
            const month = date.getMonth();
            const year = date.getFullYear();

            months.add(month);
            years.add(year);

            let monthlyTotalJournal = monthlyTotalJournalInformation[`${year}${month}`];

            if (monthlyTotalJournal === undefined) {
                monthlyTotalJournalInformation[`${year}${month}`]={year, month, total: 1};
            } else {
                let total = monthlyTotalJournalInformation[`${year}${month}`].total;
                total = total + 1;
                monthlyTotalJournalInformation[`${year}${month}`].total=total;

            }

            return {
                frontmatter: data,
                slug: getSlugAsArray(fileName),
            } as JournalModel;
        });

    return {
        journals: sortJournals(journals),
        years: Array
            .from(years)
            .sort((after:number,before:number)=> {
            return before-after
        }),
        months: Array.from(months).sort((a: number, b: number) => {
            return b - a;
        }), monthlyTotalJournalInformation
    };
};

export const getSinglePortfolio = async (slug: string) => {
    console.log("--> SLUG", slug)
    const source = getFileContent(`${slug}.mdx`, PORTFOLIOS_PATH);
    const {code, frontmatter} = await getCompiledMDX(source);

    return {
        frontmatter,
        code,
    };
};


const getSlugPath = (fileName: string) => {
    const slugs = getSlugAsArray(fileName)
    const slugPath = `${JOURNALS_PATH}/${slugs.join('/')}.mdx`
    console.log("--> getSlugPath", slugPath)
    return slugPath
}

const getSlugAsArray = (fileName: string) => {
    const slug = fileName.replace(/\.mdx?$/, "");
    const slugArray = slug.split('/');
    console.log("--> slugArray", slugArray)
    return slugArray
}


export const getStaticPathsForJournal = () => {
    const journals: JournalModel[] = fs
        .readdirSync(JOURNALS_PATH, {
            recursive: true
        })
        //@ts-ignore
        .filter((path) => /\.mdx?$/.test(path))
        .map((fileName) => {
            const source = getFileContent(getSlugPath(fileName));
            const slug = fileName.replace(/\.mdx?$/, "");
            const {data} = matter(source);

            return {
                frontmatter: data,
                slug: getSlugAsArray(fileName),
            } as JournalModel;
        });

    console.log("--> getStaticPathsForJournal", journals[0].slug)

    return sortJournals(journals)
        .map(({slug,frontmatter}) => ({params: {slug, frontmatter}}));
};

export const getAllPortfolio = () => {

    const portfolios: PortfolioModel[] = fs
        .readdirSync(PORTFOLIOS_PATH,{
            recursive: true
        })
        //@ts-ignore
        .filter((path) => /\.mdx?$/.test(path))
        .map((fileName) => {
            const source = getFileContent(getSlugPath(fileName));
            const slug = fileName.replace(/\.mdx?$/, "");
            console.log("SLUG", slug)
            const {data} = matter(source);

            return {
                frontmatter: data,
                slug: slug,
            } as PortfolioModel;
        });

    return portfolios;
};

export const getFileContent = (path:string) => { //filename: string, folderPath) => {
    return fs.readFileSync(path, "utf-8") //.join(folderPath, filename), "utf8");
};


const sortJournals = (journals: JournalModel[]) => {
    return journals.sort((a, b) => {
        const beforeDate = DateTime.fromFormat(a.frontmatter.date, 'yyyy/MM/dd')
        const afterDate = DateTime.fromFormat(b.frontmatter.date, 'yyyy/MM/dd')
        return afterDate - beforeDate
    })
}
