import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

const PageThumbnails = ({ section }) => {

	const mapThumbnails = () => {
		return section.thumbnails.map( thumbnail => (
			<Link to={ `/${ thumbnail.link }` } className="thumbnail-wrapper">
				<div
					className="thumbnail"
					style={{ background: `url("${ thumbnail.image }") center / cover no-repeat` }}
				>
					<div className="overlay">
						<h3>{ thumbnail.heading }</h3>
					</div>
				</div>
			</Link>
		));
	}

	return (
		<section id={ section.heading.replace(/[^a-z0-9]/gi, '-').toLowerCase() }>
			<div className="section-wrapper">
				<header className="section-header">
					<h2>{ section.heading }</h2>
				</header>
				<div className="section-content">
					<p>{ section.content }</p>
					<div className="thumbnails">
						{ mapThumbnails() }
					</div>
				</div>
			</div>
		</section>
	);
};

PageThumbnails.propTypes = {
	section: PropTypes.object
};

PageThumbnails.defaultProps = {
	section: null
};

export default PageThumbnails;