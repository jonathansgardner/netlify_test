import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

const FeaturedContent = ({ section }) => {
	return (
		<section className="featured-content">
			<div class="video-container">
				<iframe
					className="youtube-player"
					type="text/html"
					src="https://www.youtube.com/embed/B1qQtKxmz1s?version=3&rel=1&fs=1&autohide=2&showsearch=0&showinfo=1&iv_load_policy=1&wmode=transparent"
					allowfullscreen
					style={{ border: 0 }}
				/>
			</div>
			<p className="read-more">
				<small>
					<Link to={ `/` }>{ section.linkText } &rarr;</Link>
				</small>
			</p>
		</section>
	);
};

 // `https://www.youtube.com/embed/${ videoID }?version=3&rel=1&fs=1&autohide=2&showsearch=0&showinfo=1&iv_load_policy=1&wmode=transparent`

FeaturedContent.propTypes = {
	section: PropTypes.object
};

FeaturedContent.defaultProps = {
	section: {}
};

export default FeaturedContent;