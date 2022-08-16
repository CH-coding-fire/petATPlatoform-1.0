import { ErrorMessage, Field } from 'formik';
import React from 'react';
import TextError from './TextError';

function Input(props) {
	const { label, name, ...rest } = props;
	return (
		<div className="form-control" width="50% !important">
			<label htmlFor={name}>{label}</label>
			<Field id={name} name={name} {...rest} width="10px">
				{/* {({ field }) => {
					console.log(field);
				}} */}
			</Field>
			<ErrorMessage name={name} component={TextError} />
		</div>
	);
}

export default Input;
