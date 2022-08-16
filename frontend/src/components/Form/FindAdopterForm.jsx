import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import * as Yup from 'yup';
import classes from './simpleFormTemplate.module.css';
import TextError from './TextError';

const initialValues = {
	species: '',
	age: { Year: '', Month: '' },
	healthCondition: '',
	urgent: false,
	details: '',
	requirementToAdopter: '',
	images: [],
};

const validationSchema = Yup.object().shape({});

const onSubmit = (values) => {
	console.log('SUBMITTED DATA', values);
};

function FindAdopterForm() {
	return (
		<div className="d-flex justify-content-center ">
			<div className="border border-2 p-3 d-flex justify-content-center flex-wrap shadow rounded ">
				<div className={classes['App']}>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={onSubmit}
					>
						{(formik) => {
							return (
								<Form className={classes['form-control']}>
									<div className="d-flex justify-content-center">
										<h1>Find a adopter</h1>
									</div>
									<div>
										<label htmlFor="species">物种: </label>
										<Field
											type="text"
											name="species"
											id="species"
											placeholder="物种 will be use for login"
										/>
										<ErrorMessage name="species" component={TextError} />
									</div>
									<div>
										<label htmlFor="age">年龄</label>
										<Field
											type="text"
											name="age"
											id="age"
											placeholder="(年月)"
										/>
										<ErrorMessage name="age" component={TextError} />
									</div>
									<div>
										<label htmlFor="healthCondition">健康状况: </label>
										<Field
											type="text"
											name="healthCondition"
											id="healthCondition"
											placeholder="healthCondition will be displayed"
										/>
										<ErrorMessage
											name="healthCondition"
											component={TextError}
										/>
									</div>
									<div>
										<label htmlFor="紧急程度">紧急程度 information: </label>
										<Field
											type="text"
											name="紧急程度"
											id="紧急程度"
											placeholder="Optional"
										/>
										<ErrorMessage name="紧急程度" />
									</div>
									<Button type="Submit" className="mt-3">
										Submit
									</Button>
								</Form>
							);
						}}
					</Formik>
				</div>
			</div>
		</div>
	);
}

export default FindAdopterForm;
