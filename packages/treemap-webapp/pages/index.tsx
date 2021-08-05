import dynamic from "next/dynamic";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote";
import fs from "fs";
import path from "path";
import { serialize } from "next-mdx-remote/serialize";
import { Layout } from "../components/layout/Layout";
import { TreemapCustomizer } from "../components/TreemapCustomizer/TreemapCustomizer";
import { MainPreview } from "../components/MainPreview/MainPreview";

const defaultComponents = {};

export function Index({ source, componentNames }) {
  const components = {
    ...defaultComponents,
    MainPreview,
    TreemapCustomizer,
  };

  console.info({components})

  return (
    <Layout>
      <MDXRemote {...source} components={components} />
    </Layout>
  );
}

export async function getStaticProps() {
  const source = fs.readFileSync("README.md");

  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  };
}

export default Index;
