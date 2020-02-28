/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it.

const path = require('path');

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
    }
    type Frontmatter {
      contactForm: MarkdownRemarkFrontmatterContactForm
		}
		type MarkdownRemarkFrontmatterContactForm {
			buttonText: String!
		}
  `
  createTypes( typeDefs );
}

exports.createPages = ({ actions, graphql }) => {
	const { createPage } = actions;

	return graphql(
		`{
			allFile(filter: {relativeDirectory: {eq: "pages"}}) {
				edges {
					node {
						name
						childMarkdownRemark {
							excerpt(pruneLength: 400, format: HTML, truncate: true)
							html
							frontmatter {
								title
								heading
							}
						}
					}
				}
			}
			file(sourceInstanceName: {eq: "settings"}, name: {eq: "homepage"}) {
				childMarkdownRemark {
					frontmatter {
						sections {
							heading
							content
							linkText
							page
							thumbnails {
								image
								pageLink
							}
							type
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

		// homepage
		const { sections, showTestimonials, showContactForm } = result.data.file.childMarkdownRemark.frontmatter;
		const homepageSections = sections.map( section => {
			if ( section.type === 'pagePreview' ) {
				const page = result.data.allFile.edges.find( edge => section.page === edge.node.childMarkdownRemark.frontmatter.title );
				return {
					type: section.type,
					heading: section.heading ? section.heading : page.node.childMarkdownRemark.frontmatter.heading,
					content: section.content ? section.content : page.node.childMarkdownRemark.excerpt,
					linkText: section.linkText,
					page: page.node.name
				}
			}
			
			if ( section.type === 'pageThumbnails' ) {
				const thumbnails = section.thumbnails.map( thumbnail => {
					const page = result.data.allFile.edges.find( edge => thumbnail.pageLink === edge.node.childMarkdownRemark.frontmatter.title );
					return {
						heading: thumbnail.heading ? thumbnail.heading : page.node.childMarkdownRemark.frontmatter.heading,
						image: thumbnail.image,
						link: page.node.name
					}
				})
				return {
					type: section.type,
					heading: section.heading,
					content: section.content,
					thumbnails
				}
			}

			return section;
		}, [] );
		createPage({
			path: '/',
			component: path.resolve( 'src/pages/templates/Homepage.js'),
			context: {
				sections: homepageSections,
				showTestimonials,
				showContactForm
			}
		})

		// pages
		result.data.allFile.edges.map( edge => {
			const pagePath = `/${ edge.node.name }`;
			const body = edge.node.childMarkdownRemark.html;
			const { title, heading } = edge.node.childMarkdownRemark.frontmatter;
			createPage({
				path: pagePath,
				component: path.resolve( 'src/pages/templates/Page.js' ),
				context: {
					title,
					heading,
					body
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