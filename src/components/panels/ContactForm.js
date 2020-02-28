import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import './Testimonials.css';

const Testimonials = () => {

	const { markdownRemark: { frontmatter : { contactForm: data } } } = useStaticQuery(
		graphql`
			query ContactFormQuery {
				markdownRemark {
					frontmatter {
						contactForm {
							heading
							formFields {
								label
								title
								type
							}
						}
					}
				}
			}
		`
	);

	const mapFormFields = () => (
		data.formFfields.map( field => {
			switch( field.type ) {
				case 'Text':
					return <input type="text" name={ field.title.toLowerCase() } placeholder={ field.label } autocomplete="off" />;
				case 'Email':
					return <input type="email" name={ field.title.toLowerCase() } placeholder={ field.label } autocomplete="off" />;
				case 'Phone':
					return <input type="tel" name={ field.title.toLowerCase() } placeholder={ field.label } autocomplete="off" />;
				case 'Website':
					return <input type="url" name={ field.title.toLowerCase() } placeholder={ field.label } autocomplete="off" />;;
				case 'Checkbox':
					return null;
				case 'Dropdown':
					return (
						<select>
							<option value="" disabled selected hidden>{ field.label }</option>
							{ field.options.map( opt => <option value={ option.option }>{ opt.label }</option> ) }
						</select>
					)
				case 'Paragraph':
					return <textarea name={ field.title.toLowerCase() } placeholder={ field.label } rows="4"></textarea>
				default:
					return null;
			}
		})
	);
	
	return (
		<section id="contact">
			<div class="panel-wrapper">
				<header class="section-header">
					<h2>Get In Touch</h2>
				</header>
				<form>
					
					<input type="submit" />
				</form>
			</div>
		</section>
	);
};

export default Testimonials;