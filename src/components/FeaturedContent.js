import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

const FeaturedContent = ({ section }) => {
	return (
		<section className="featured-content">
		</section>
	);
};

FeaturedContent.propTypes = {
	section: PropTypes.object
};

FeaturedContent.defaultProps = {
	section: {}
};

export default FeaturedContent;