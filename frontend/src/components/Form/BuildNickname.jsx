import { Form, Formik } from 'formik';
import React from 'react';
import axios from 'axios';

import { Button } from 'react-bootstrap';
import * as Yup from 'yup';
import FormikControl from './FormikControl';
import classes from './simpleFormTemplate.module.css';

import { useState } from 'react';

function BuildNickName() {
	const initialValues = {
		nickname: '',
		contactInfo: '',
	};
	const validationSchema = Yup.object({
		nickname: Yup.string().min(2, '需兩個字元或更多').required('必填'),
		// contactInfo: Yup.string().min(8, '需八個字元或更多').required('必填'),
	});

	const onSubmit = async (values) => {
		console.log('tryFetchReqUser...');
		await fetch('http://localhost:8080/users/nicknameContact', {
			method: 'POST',
			credentials: 'include',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Credentials': true,
			},
			body: JSON.stringify(values),
		})
			.then((response) => {
				if (response.status === 200) {
					console.log('response');
					window.open('http://localhost:3000/', '_self');
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
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
							// console.log('FORMIK PROPS', formik);
							// console.log('values', formik.values);
							return (
								<Form>
									<div className="d-flex justify-content-center">
										<h1>發起開放領養</h1>
									</div>
									<FormikControl
										control="input"
										type="text"
										label="昵稱:* (其他使用者看見你的名字)"
										name="nickname"
										placeholder="養貓高手1995"
									/>

									<FormikControl
										control="textarea"
										label="聯絡方法:*"
										name="contactInfo"
										placeholder="電話, email, Whatsapp, Instagram, Wechat..."
									/>
									<div className="d-flex justify-content-center">
										<Button type="submit">提交</Button>
									</div>
								</Form>
							);
						}}
					</Formik>
				</div>
			</div>
		</div>
	);
}

export default BuildNickName;
