/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';

import Header from '../Header/index';
import './Layout.css';

const Layout = ({ children }) => {
  const data = useStaticQuery(
		graphql`
			query MyQuery {
				file(sourceInstanceName: {eq: "settings"}, name: {eq: "identity"}) {
					childMarkdownRemark {
						frontmatter {
							siteIdentity {
								copyright
								siteTitle
								slogan
							}
						}
					}
				}
			}
		`
	);

  return (
    <div id="site-wrapper">
      <Header
				siteTitle={ data.file.childMarkdownRemark.frontmatter.siteIdentity.siteTitle }
				slogan={ data.file.childMarkdownRemark.frontmatter.siteIdentity.slogan }
				copyright={ data.file.childMarkdownRemark.frontmatter.siteIdentity.copyright }
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