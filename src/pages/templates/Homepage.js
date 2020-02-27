import React from 'react';
import PropTypes from 'prop-types';

import Layout from '../../components/Layout';
import SEO from '../../components/seo';
import PagePreview from '../../components/PagePreview';

const Homepage = ({ pageContext }) => {

	// const mapSections = () => {
	// 	return pageContext.sections.map( ( section, index ) => {
	// 		switch ( section.type ) {
	// 			case 'pagePreview':
	// 				const page = pageContext.pageData.find( page => page.title === section.page );
	// 				return <PagePreview section={ section } page={ page } key={ index.toString() } />;
	// 			case 'pageThumbnails':
	// 				return null; 
	// 			default:
	// 				return null;
	// 		}
	// 	});
	// };
	
	return (
		<Layout>
    <SEO title="Home" />
		{ console.log( pageContext )}
		{/* mapSections() */}
  </Layout>
	);
};

Homepage.propTypes = {
};

Homepage.defaultProps = {
};

export default Homepage;