/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';

import Header from './Header';
import './Layout.css';
import './PageSections.css';

const Layout = ({ children }) => {
  const { file: { childMarkdownRemark: { frontmatter: data } } } = useStaticQuery(
		graphql`
			query MyQuery {
				file(sourceInstanceName: {eq: "settings"}, name: {eq: "identity"}) {
					childMarkdownRemark {
						frontmatter {
							logo
							siteTitle
							slogan
							copyright
						}
					}
				}
			}
		`
	);

  return (
    <div id="site-wrapper">
      <Header
				siteTitle={ data.siteTitle }
				slogan={ data.slogan }
				copyright={ data.copyright }
			/>
      <main id="site-content">
				{ children }
			</main>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;