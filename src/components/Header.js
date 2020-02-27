import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import PropTypes from 'prop-types';

import './Header.css';

const Header = ({ siteTitle, slogan, copyright }) => {

	const { placeholderImage: { childMarkdownRemark: { frontmatter: data } } } = useStaticQuery(
		graphql`
			query {
				placeholderImage: file( sourceInstanceName: {eq: "settings"}, name: {eq: "identity"} ) {
					childMarkdownRemark {
						frontmatter {
							headerImage
						}
					}
				}
			}
		`
	);
	
	return (
		<header
			id="site-header"
			style={{ background: `url(${ data.headerImage }) center/cover no-repeat` }}
		>
			<header>
				<nav></nav>
			</header>
			<div id="site-branding">
				<h1>
					<Link to="/">
						{ siteTitle }
					</Link>
				</h1>
				<h4>{ slogan }</h4>
			</div>
			<footer>
				<small>{ copyright }</small>
			</footer>
		</header>
	);
};

Header.propTypes = {
	siteTitle: PropTypes.string,
	slogn: PropTypes.string,
	copyright: PropTypes.string
};

Header.defaultProps = {
	siteTitle: '',
	slogan: '',
	copyright: ''
};

export default Header;