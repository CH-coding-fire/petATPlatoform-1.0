import { Form, Formik } from 'formik';
import React from 'react';
import axios from 'axios';

import { Button } from 'react-bootstrap';
import * as Yup from 'yup';
import FormikControl from './FormikControl';
import classes from './simpleFormTemplate.module.css';
import {
	animalClassesOptions,
	animalClassifier,
} from '../../animalClassification';
import  {
        urgencyOptions,sexOptions, sellOrFreeOptions, goLevel3classification, notGoSpeciesNameForm}
		 from './formOptions';
import { useState,useRef } from 'react';
import '../../App.css';




import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';

registerPlugin(FilePondPluginFileValidateType, FilePondPluginImagePreview, FilePondPluginFileEncode)

function FormikContainer(props) {
	const [files, setFiles] = useState([]);
	const [isUploading, setIsUploading] = useState(false)
	const [fileErrorMsg, setFileErrorMsg] = useState('')
	const myRef = useRef(null)
	const executeScroll = () => myRef.current.scrollIntoView()
	console.log('FILE!',files)

	let preFilledValues =()=> {
		return false
	}
	if (props.animalToBeUpdated) { //If update button is pressed
	const {animal} = props.animalToBeUpdated
		preFilledValues = (animalProperty) => {
			switch (animalProperty) {
				// case '_id':
				// 	return animal._id
				case 'animalName':
					return animal.animalName
				case 'animalClasses':
					return animal.animalClasses
				case 'animalGenera':
					return animal.animalGenera
				case 'animalSpecies':
					return animal.animalSpecies
				case 'animalSpeciesName':
					return animal.animalSpeciesName
				case 'animalSex':
					return animal.animalSex
				case 'animalAge':
					return animal.animalAge
				case 'urgencyOptions':
					return animal.urgencyOptions
				case 'healthCondition':
					return animal.healthCondition
				case 'description':
					return animal.description
				case 'requirementToAdopter':
					return animal.requirementToAdopter
				case 'contactInfo':
					return animal.contactInfo
				case 'deliveryInfo':
					return animal.deliveryInfo
				case 'imagesArray':
					return animal.imagesArray
				case 'animalPrice':
					return animal.animalPrice
				case 'sellOrFreeOptions':
					return animal.sellOrFreeOptions

				default:
					return
			}
		}
	}

	const initialValues = {
		animalName: preFilledValues('animalName') || '',
		animalClassification: {
			class: '',
			genus: '',
			species: '',
			speciesInputName: '',
		},
		animalClasses: preFilledValues('animalClasses') || '',
		animalGenera: preFilledValues('animalGenera') || '',
		animalSpecies: preFilledValues('animalSpecies') || '',
		animalSpeciesName: preFilledValues('animalSpeciesName') || '',
		animalSex: preFilledValues('animalSex') || '',
		animalAge: preFilledValues('animalAge') || { years: '', months: '', days: '' },
		urgencyOptions: preFilledValues('urgencyOptions') || '',
		healthCondition: preFilledValues('healthCondition') || '',
		description: preFilledValues('description') || '',
		requirementToAdopter: preFilledValues('requirementToAdopter') || '',
		contactInfo: preFilledValues('contactInfo') || '',
		deliveryInfo: preFilledValues('deliveryInfo') || '',
		// imagesArray: [],
		animalPrice: preFilledValues('animalPrice') || '',
		sellOrFreeOptions: preFilledValues('sellOrFreeOptions') || '',

		//If update button is pressed


	};

	const validationSchema = Yup.object({
		animalName: Yup.string(),
		description: Yup.string().required('??????'),
		animalClasses: Yup.string().required('??????'),
		animalSpecies: Yup.string(),
		animalSpeciesName: Yup.string().required('??????'),
		animalSex: Yup.string().required('??????'),
		animalAge: Yup.object().shape({
			years: Yup.number()
				.max(99, '????????????99???,\n???????????????0')
				.min(0, '????????????')
				.integer('????????????')
				.required('??????'),
			months: Yup.number()
				.max(99, '????????????11???,???????????????')
				.min(0, '????????????')
				.integer('????????????')
				.required('??????'),
			days: Yup.number()
				.max(99, '????????????31???, ??????????????????')
				.min(0, '????????????')
				.integer('????????????')
				.required('??????'),
		}),
		urgencyOptions: Yup.string().required('????????????????????????'),
		healthCondition: Yup.string().required('????????????????????????'),
		contactInfo: Yup.string().required('????????????????????????'),
		deliveryInfo: Yup.string().required('????????????????????????'),
		requirementToAdopter: Yup.string(),
		sellOrFreeOptions: Yup.string().required('???????????????????????????'),
		animalPrice: Yup.string().when('sellOrFreeOptions', {
			is: ('sell' || 'paidAdoption'),
			then: Yup.string().required('?????????????????????????????????'),
		})

	});

			console.log(props.animalToBeUpdated)




	const onSubmit = (values) => {
		console.log(('FORM DATA: ', values));
		if (props.updateAnimalHandler) { //if we are updating an animal
			props.updateAnimalHandler( {option:'updateAnimalInfo', animalId:props.animalToBeUpdated.animal._id, updateContent:values});
			return
		 }
		if(files.length ===0){
			console.log('hi')
			setFileErrorMsg('????????????????????????')
			executeScroll()
			return
		}
		if(fileErrorMsg === '???????????????...'){
			executeScroll()
			return
		}

		console.log(files)
		const fileServerIds = files.map(file => file.serverId)
		console.log(fileServerIds)
		values.animalImages = fileServerIds
		axios
			.post('/api/adoptions/', values, {
			})
			.then((res) => {
				console.log(res)
				window.open('/', '_self');

			});
	};
	const deletePriceHandler = () => {
		initialValues.animalPrice = '';
	}

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
							// console.log('values', formik.values)
							const { values } = formik;
							const resetLevel2OrAbove = () => {
								values.animalGenera = '';
								values.animalSpecies = '';
							};
							const resetLevel3 = () => {
								values.animalSpecies = '';
							};

							return (
								<Form>
									<div className="d-flex justify-content-center">
										{props.animalToBeUpdated? <h1>??????????????????</h1> : <h1>??????????????????</h1>}
									</div>
									<FormikControl
										control="input"
										type="text"
										label="????????????: (??????)"
										name="animalName"
										placeholder="??????: ?????? (??????)"
									/>
									<div className="form-control" ref={myRef}>
										<div className="fw-bold" >????????????:* (????????????)</div>

										{!props.animalToBeUpdated &&
											<FilePond
												files={files}
												onupdatefiles={setFiles}
												// onupdatefiles={files => {
												// 	console.log('hi', { files });  // <-- Runs twice on page load due to file preload
												// }}
												allowMultiple
												instantUpload
												allowReorder
												maxFiles={10}
												name="image"
												labelIdle='<span class="fw-bold filepond--label-action">????????????</span>
										   <div>??????????????????????????????, ???????????????</div>'
												itemInsertLocation='after'
												labelFileProcessing="?????????"
												labelFileProcessingComplete="????????????"
												labelTapToUndo="????????????"
												onreorderfiles={(currentListOfFile) => { setFiles(currentListOfFile) }}
												onprocessfilestart={() => {
													setFileErrorMsg('???????????????...')
													setIsUploading(true)
												}
												}
												onprocessfiles={() => {
													console.log('finish uploading')
													setFileErrorMsg('')
													setIsUploading(false)
												}}
												onprocessfilerevert={(res) => {
													console.log('res.serverId:', res.serverId)
													console.log('da index', files.indexOf(res))
													setFiles(files.filter(file => file.serverId != res.serverId))
													setFileErrorMsg('')
												}}
												server={
													{
														url: "/api/adoptions",

														revert: { url: '/revert' },

														process: {
															url: '/process',
															method: 'POST',
															withCredentials: false,
															headers: {},
															timeout: 7000,
															onload: (res) => {
																let data = JSON.parse(res)
																console.log(data)
																return data.fileId
															},
															ondata: (formData) => {
																return formData;
															}
														},

														fetch: {
															url: '/fetch',
														},
														load: (source, load, error, progress, abort, headers) => {
															var myRequest = new Request(source);
															fetch(myRequest).then(function (response) {
																response.blob().then(function (myBlob) {
																	load(myBlob);
																});
															});
														}
													}
												}
											/>}
													   <div className='fw-bold text-danger'>{fileErrorMsg}</div>
													   </div>


									<FormikControl
										control="select"
										label="????????????*"
										name="animalClasses"
										options={animalClassesOptions}
										onBlur={resetLevel2OrAbove}
									/>
									{values.animalClasses &&
										!notGoSpeciesNameForm.includes(
											//*e.g. the entered value is included in the array,
											//*then return true, and!true = false, overall will be false and not be shown
											//* so return true, !true, =false, so the list will not be showed
											values.animalClasses
										) && (
											<FormikControl
												control="select"
												label="???????????? - ???2???"
												name="animalGenera"
												options={animalClassifier(values.animalClasses)}
												onBlur={resetLevel3}
											/>
										)}
									{values.animalGenera &&
										goLevel3classification.includes(values.animalGenera) && (
											<FormikControl
												control="select"
												label="???????????? - ???3???"
												name="animalSpecies"
												options={animalClassifier(values.animalGenera)}
											/>
										)}
									{!notGoSpeciesNameForm.includes(
										values.animalSpecies || values.animalGenera
									) && (
										<FormikControl
											control="input"
											type="text"
											label="????????????*:"
											name="animalSpeciesName"
											placeholder="??????: ??????????????????"
										/>
									)}
									<div className="form-control d-flex">
										<label className="align-items-center">
											<p>????????????:</p>
										</label>
										<div className="d-flex justify-content-start ">
											<div>
												<FormikControl
													control="input"
													label="???*"
													name="animalAge.years"
													placeholder=""
													size="2"
												/>
											</div>
											<div>
												<FormikControl
													control="input"
													label="???*"
													name="animalAge.months"
													placeholder=""
													size="2"
												/>
											</div>
											<div>
												<FormikControl
													control="input"
													label="???*"
													name="animalAge.days"
													placeholder=""
													size="2"
												/>
											</div>
										</div>
									</div>

									<div className="d-flex">
										<FormikControl
											control="radio"
											label="??????:*"
											name="animalSex"
											options={sexOptions}
											className="d-flex "
										/>
									</div>

									<FormikControl
										control="radio"
										label="????????????:*"
										name="urgencyOptions"
										options={urgencyOptions}
										className="d-flex flex-column"
									/>
									<FormikControl
										control="textarea"
										label="????????????:*"
										name="healthCondition"
										placeholder="??????:??????, ????????????"
									/>
									<div className="d-flex">
										<FormikControl
											control="radio"
											label="?????????????????????:*"
											name="sellOrFreeOptions"
											options={sellOrFreeOptions}
											onClick={() => {values.animalPrice = ''}}
											className="d-flex "
										/>
									</div>
									{(values.sellOrFreeOptions === "sell" || values.sellOrFreeOptions ==="paidAdoption" )&& (<FormikControl
													control="input"
										label="???????????????: ($??????HKD)"
										type="text"
													name="animalPrice"
													placeholder="????????????HKD"
													size="2"
										/>)}
									<FormikControl
										control="textarea"
										label="????????????:*"
										name="description"
										placeholder="??????: ??????, ???????????????, ??????, ??????????????????..."
									/>

									<FormikControl
										control="textarea"
										label="?????????????????????:*"
										name="requirementToAdopter"
										placeholder="??????: ????????????, ??????????????????????????????, ????????????, ????????????, ?????????????????????20??????...  "
									/>
									{/* <FormikControl
										control="checkbox"
										label="Checkbox topics"
										name="checkboxOptions"
										options={checkboxOptions}
									/> */}
									<FormikControl
										control="textarea"
										label="????????????:*"
										name="contactInfo"
										placeholder="??????, email, Whatsapp, Instagram, Wechat..."
									/>

									<FormikControl
										control="textarea"
										label="????????????:*"
										name="deliveryInfo"
										placeholder="??????: ??????????????????, ????????????8??????, ???????????????????????????...  "
									/>

									<div className="d-flex justify-content-around">
										{props.animalToBeUpdated && <Button onClick={props.closeUpdateAnimalModalHandler} className='bg-danger btn-danger'>??????</Button>}
										<Button type="submit">{props.animalToBeUpdated ? '????????????' : '??????'}</Button>
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

export default FormikContainer;
