import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import PropTypes from 'prop-types';

const PagePreview = ({ section, page }) => {
	return (
		<section id={ page.title }>
			<div className="section-wrapper">
				<header className="section-header">
					<h2>{ section.heading ? section.heading : page.heading }</h2>
				</header>
				<div className="section-content">
					<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis fugit officia deserunt odio quas quam exercitationem vero dignissimos quos. Accusamus neque consectetur atque non rerum minima porro recusandae. Doloremque, tempora? Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam unde reiciendis atque debitis, est, hic optio nam eos ad dignissimos beatae ducimus fugit eveniet ipsa, consequuntur sunt dicta consequatur dolores.</p>
					<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae laudantium commodi, error quam amet quibusdam maxime molestias eligendi rem repellat accusamus cum ducimus dolores deleniti. Quod minima eum repudiandae deleniti.</p>
					<p className="read-more">
						<small>
							<Link to={ `/${ page.title.toLowerCase() }` }>{ section.linkText } &rarr;</Link>
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
	section: {}
};

export default PagePreview;