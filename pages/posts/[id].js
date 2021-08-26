import Layout from "../../components/layout";
import Date from "../../components/date";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import utilStyles from '../../styles/utils.module.css'

export default function Post({postData}){
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>
            </article>
            <div dangerouslySetInnerHTML={{__html:postData.contentHtml}}/>
        </Layout>
    )
}

// 读取 posts 目录下所有的 .md 文件，根据 .md 文件名 生成 js 页面的路径
export async function getStaticPaths(){
    const paths = getAllPostIds()
    return {
        paths,
        fallback: false
    }
}

// 根据 文件名 id，找到对应的页面
export async function getStaticProps({params}){
    const postData = await getPostData(params.id)
    return {
        props: {
            postData
        }
    }
}