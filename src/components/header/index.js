import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import './Header.css';

const Header = ({ siteTitle, slogan, copyright }) => (
	<header
		id="site-header"
		style={{ background: `url("https://images.unsplash.com/photo-1512588966017-9add7f6bee7c") center/cover no-repeat` }}
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