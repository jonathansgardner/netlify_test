import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import './Testimonials.css';

const Testimonials = () => {

	const data = useStaticQuery(
		graphql`
			query TestimonialsQuery {
				allFile(filter: {relativeDirectory: {eq: "testimonials"}}) {
					edges {
						node {
							childMarkdownRemark {
								frontmatter {
									quote
									hometown
									author
								}
							}
						}
					}
				}
				markdownRemark {
					frontmatter {
						testimonials {
							heading
							includeAudio
						}
					}
				}
			}
		`
	);

	const testimonials = data.allFile.edges;
	const settings = data.markdownRemark.frontmatter;

	const mapTestimonials = () => (
		testimonials.map( ({ node: { childMarkdownRemark: { frontmatter: testimonial } } }) => (
			<div className="testimonial">
				{ settings.includeAudio && testimonial.recording
						? <audio className="audio" preload="auto">
								{ testimonial.recording.mp3
										? <source src={ testimonial.recording.mp3 } type="audio/mpeg" />
										: null
								}
								{ testimonial.recording.ogg
										? <source src={ testimonial.recording.ogg } type="audio/ogg" />
										: null
								}
							</audio>
						: null
				}
				<div className="content">
					{ settings.includeAudio && testimonial.recording
						? <div className="player">
								<i className="fas fa-play control"></i>
							</div>
						: null
					}
					<p className="quote"><span><i className="fas fa-quote-left">&ldquo;</i>&nbsp;&nbsp;{ testimonial.quote }</span></p>
					<p className="name"><b>{ testimonial.author }</b> - <span className="from">{ testimonial.hometown }</span></p>
				</div>
			</div>
		))
	);
	
	return (
		<section id="testimonials">
			<div className="panel-wrapper">
				<header className="section-header">
					<h2>{ settings.heading ? settings.heading : 'Testimonials' }</h2>
				</header>
				<div id="buttons">
					<span id="previous-testimonial">prev</span>
					|
					<span id="next-testimonial">next</span>
				</div>
				<div className="section-content">
					<div className="scrollbar-mask">
						<div id="testimonial-container">
							{ mapTestimonials() }
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Testimonials;