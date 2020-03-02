import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import PropTypes from 'prop-types';

import './Header.css';

const Header = ({ logo, siteTitle, slogan, copyright }) => {

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
			style={{
				background: data.headerImage ? `url(${ data.headerImage })  hsl(0, 0%, 0%) center/cover no-repeat` : 'hsl(0, 0%, 0%)'
			}}
		>
			<header>
				<nav></nav>
			</header>
			{console.log( logo )}
			<div id="site-branding">
				{ logo ? <img id="logo" src={ logo } /> : null }

				{/* { siteTitle
					? <h1 id="site-title">
							<Link to="/">
								{ siteTitle }
							</Link>
						</h1>
					: null
				} */}

				{ slogan ? <h4 id="slogan">{ slogan }</h4> : null }
			</div>
			<footer>
				<small>{ copyright ? copyright : `Copyright © ${ new Date().getFullYear() } ${ siteTitle ? siteTitle : null }` }</small>
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