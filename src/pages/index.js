import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import { fromMarkdown } from 'mdast-util-from-markdown';
import { toHast } from 'mdast-util-to-hast';
import { toHtml } from 'hast-util-to-html';

const Page = () => {
  const {
    allMdx: { nodes }
  } = useStaticQuery(graphql`
    {
      allMdx {
        nodes {
          body
        }
      }
    }
  `);

  return (
    <main>
      <h1>Index</h1>
      {nodes.map((node, index) => {
        const { body } = node;
        const mdast = fromMarkdown(body);
        const hast = toHast(mdast);
        const html = toHtml(hast);
        return <div key={index} dangerouslySetInnerHTML={{ __html: html }} />;
      })}
    </main>
  );
};

export default Page;
