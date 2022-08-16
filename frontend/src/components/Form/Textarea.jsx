import { ErrorMessage, Field, Form } from 'formik';
import React from 'react';
import TextError from './TextError';

function Textarea(props) {
	const { label, name, ...rest } = props;
	return (
		<div className="form-control">
			<label htmlFor={name}>{label}</label>
			<Field id={name} name={name} as="textarea" {...rest} />
			<ErrorMessage name={name} component={TextError} />
		</div>
	);
}

export default Textarea;
