import { ErrorMessage, Field } from 'formik';
import React from 'react';
import TextError from './TextError';
function RadioButtons(props) {
	const { name, label, options, ...rest } = props;
	return (
		<div className="form-control">
			<label>{label}</label>
			<div className={`d-flex`} {...rest}>
				<Field name={name} {...rest} className="bg-info  ">
					{({ field }) => {
						// console.log(field);
						return options.map((option) => {
							return (
								<div className="d-flex me-4" key={option.key}>
									<div className="d-flex align-items-center">
										<input
											type="radio"
											id={option.value}
											{...field}
											value={option.value}
											checked={field.value === option.value}
										/>
									</div>
									<label
										className="d-flex align-items-center"
										htmlFor={option.value}
									>
										{option.key}
									</label>
								</div>
							);
						});
					}}
				</Field>
			</div>
			<ErrorMessage name={name} component={TextError} />
		</div>
	);
}

export default RadioButtons;
