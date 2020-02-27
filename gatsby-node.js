/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it.

const path = require('path');

exports.createPages = ({ actions, graphql }) => {
	const { createPage } = actions;

	return graphql(
		`{
			allFile(filter: {relativeDirectory: {eq: "pages"}}) {
				edges {
					node {
						childMarkdownRemark {
							frontmatter {
								title
								heading
								content
								snippet
							}
						}
						name
					}
				}
			}
			file(sourceInstanceName: {eq: "settings"}, name: {eq: "homepage"}) {
				childMarkdownRemark {
					frontmatter {
						sections {
							type
							heading
							content
							page
							thumbnails {
								image
								pageLink
							}
							linkText
						}
						showTestimonials
						showContactForm
					}
				}
			}
		}`
	). then( result => {
		if ( result.error ) {
			result.errors.forEach( e => console.error( e.toString() ) );
      return Promise.reject( result.errors );
		}

		const { sections, showTestimonials, showContactForm } = result.data.file.childMarkdownRemark.frontmatter;
		let pageData = [];
		for ( section of sections ) {
			console.log( section)
			if ( section.type === 'pagePreview' ) {
				const page = result.data.allFile.edges.find( edge => section.page === edge.node.childMarkdownRemark.frontmatter.title );
				pageData.push( page.node.childMarkdownRemark.frontmatter );
			}
		}
		createPage({
			path: '/',
			component: path.resolve( 'src/pages/templates/Homepage.js'),
			context: {
				sections,
				showTestimonials,
				showContactForm,
				pageData
			}
		})

		result.data.allFile.edges.map( edge => {
			const pagePath = edge.node.name;
			const { title, heading, content, snippet } = edge.node.childMarkdownRemark.frontmatter;
			createPage({
				path: pagePath,
				component: path.resolve( 'src/pages/templates/Page.js' ),
				context: {
					title,
					heading,
					content,
					snippet
				}
			})
		})
	})
}

exports.onCreateNode = ({ node, actions, getNode }) => {
	// if ( node.internal.type === `MarkdownRemark` ) {
	// 	console.log( node.frontmatter );
	// }
}