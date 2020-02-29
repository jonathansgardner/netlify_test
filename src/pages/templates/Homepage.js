import React from 'react';
import PropTypes from 'prop-types';

import Layout from '../../components/Layout';
import SEO from '../../components/seo';
import PagePreview from '../../components/PagePreview';
import PageThumbnails from '../../components/PageThumbnails';
import Testimonials from '../../components/panels/Testimonials';
import ContactForm from '../../components/panels/ContactForm';

const Homepage = ({ pageContext }) => {

	const mapSections = () => {
		return pageContext.sections.map( ( section, index ) => {
			switch ( section.type ) {
				case 'pagePreview':
					return <PagePreview section={ section } key={ index.toString() } />;
				case 'pageThumbnails':
					return <PageThumbnails section={ section } key={ index.toString() } />;
				default:
					return null;
			}
		});
	};
	
	return (
		<Layout>
			<SEO title="Home" />
			{ console.log( pageContext )}
			<div id="sections">
				{ mapSections() }
			</div>
			<div id="panels">
				{ pageContext.showTestimonials 
						? <Testimonials />
						: null
				}
				{ pageContext.showContactForm 
						? <ContactForm />
						: null
				}
			</div>
		</Layout>
	);
};

Homepage.propTypes = {
	pageContext: PropTypes.object
};

Homepage.defaultProps = {
	pageContext: null
};

export default Homepage;