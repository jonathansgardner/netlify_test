import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import './ContactForm.css';

const ContactForm = () => {

	const { file: { childMarkdownRemark : { frontmatter : { contactForm: data } } } } = useStaticQuery(
		graphql`
			query ContactFormQuery {
				file(sourceInstanceName: {eq: "settings"}, name: {eq: "panels"}) {
					childMarkdownRemark {
						frontmatter {
							contactForm {
								buttonText
								formFields {
									label
									title
									type
								}
								heading
							}
						}
					}
				}
			}
		`
	);

	const mapFormFields = () => (
		data.formFields.map( field => {
			switch( field.type ) {
				case 'text':
				case 'email':
				case 'tel':
				case 'url':
					return <input type={ field.type } name={ field.title.toLowerCase() } placeholder={ field.label } autocomplete="off" />;;
				case 'checkbox':
					return null;
				case 'dropdown':
					return (
						<select>
							<option value="" disabled selected hidden>{ field.label }</option>
							{ field.options.map( opt => <option value={ opt.option }>{ opt.label }</option> ) }
						</select>
					)
				case 'paragraph':
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
					{ mapFormFields() }
					<input type="submit" value={ data.buttonText ? data.buttonText : 'Submit' } />
				</form>
			</div>
		</section>
	);
};

export default ContactForm;