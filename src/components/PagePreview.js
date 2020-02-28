import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

const PagePreview = ({ section }) => {
	return (
		<section id={ section.page }>
			<div className="section-wrapper">
				<header className="section-header">
					<h2>{ section.heading }</h2>
				</header>
				<div className="section-content">
					<div dangerouslySetInnerHTML={{ __html: section.content }}></div>
					<p className="read-more">
						<small>
							<Link to={ `/${ section.page }` }>{ section.linkText } &rarr;</Link>
						</small>
					</p>
				</div>
			</div>
		</section>
	);
};

PagePreview.propTypes = {
	section: PropTypes.object
};

PagePreview.defaultProps = {
	section: null
};

export default PagePreview;