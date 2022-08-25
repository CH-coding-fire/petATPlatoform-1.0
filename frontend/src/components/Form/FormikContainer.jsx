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
		description: Yup.string().required('必填'),
		animalClasses: Yup.string().required('必填'),
		animalSpecies: Yup.string(),
		animalSpeciesName: Yup.string().required('必填'),
		animalSex: Yup.string().required('必填'),
		animalAge: Yup.object().shape({
			years: Yup.number()
				.max(99, '不可超過99歲,\n不足歲請填0')
				.min(0, '請填正數')
				.integer('請填整數')
				.required('必填'),
			months: Yup.number()
				.max(99, '不可超過11月,請增加一歲')
				.min(0, '請填正數')
				.integer('請填整數')
				.required('必填'),
			days: Yup.number()
				.max(99, '如果超過31天, 請增加一個月')
				.min(0, '請填正數')
				.integer('請填整數')
				.required('必填'),
		}),
		urgencyOptions: Yup.string().required('必須填寫緊急程度'),
		healthCondition: Yup.string().required('必須填寫健康狀況'),
		contactInfo: Yup.string().required('必須填寫聯絡方法'),
		deliveryInfo: Yup.string().required('必須填寫交收方法'),
		requirementToAdopter: Yup.string(),
		sellOrFreeOptions: Yup.string().required('必須填寫出售或送養'),
		animalPrice: Yup.string().when('sellOrFreeOptions', {
			is: ('sell' || 'paidAdoption'),
			then: Yup.string().required('必須填寫價錢或補償金額'),
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
			setFileErrorMsg('最少上傳一幅圖像')
			executeScroll()
			return
		}
		if(fileErrorMsg === '尚在上傳中...'){
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
				window.open('http://localhost:3000/', '_self');

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
										{props.animalToBeUpdated? <h1>修改動物資料</h1> : <h1>發起開放領養</h1>}
									</div>
									<FormikControl
										control="input"
										type="text"
										label="動物名字: (選填)"
										name="animalName"
										placeholder="例子: 豆奶 (選填)"
									/>
									<div className="form-control" ref={myRef}>
										<div className="fw-bold" >上載圖片:* (最少一幅)</div>

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
												labelIdle='<span class="fw-bold filepond--label-action">瀏覽檔案</span>
										   <div>第一幅默認為動物頭像, 可拉動調整</div>'
												itemInsertLocation='after'
												labelFileProcessing="上載中"
												labelFileProcessingComplete="上載完成"
												labelTapToUndo="按此取消"
												onreorderfiles={(currentListOfFile) => { setFiles(currentListOfFile) }}
												onprocessfilestart={() => {
													setFileErrorMsg('尚在上傳中...')
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
										label="動物種類*"
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
												label="動物種類 - 第2層"
												name="animalGenera"
												options={animalClassifier(values.animalClasses)}
												onBlur={resetLevel3}
											/>
										)}
									{values.animalGenera &&
										goLevel3classification.includes(values.animalGenera) && (
											<FormikControl
												control="select"
												label="動物種類 - 第3層"
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
											label="種類名稱*:"
											name="animalSpeciesName"
											placeholder="例子: 侏儒三線倉鼠"
										/>
									)}
									<div className="form-control d-flex">
										<label className="align-items-center">
											<p>動物年齡:</p>
										</label>
										<div className="d-flex justify-content-start ">
											<div>
												<FormikControl
													control="input"
													label="歲*"
													name="animalAge.years"
													placeholder=""
													size="2"
												/>
											</div>
											<div>
												<FormikControl
													control="input"
													label="月*"
													name="animalAge.months"
													placeholder=""
													size="2"
												/>
											</div>
											<div>
												<FormikControl
													control="input"
													label="天*"
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
											label="性別:*"
											name="animalSex"
											options={sexOptions}
											className="d-flex "
										/>
									</div>

									<FormikControl
										control="radio"
										label="緊急程度:*"
										name="urgencyOptions"
										options={urgencyOptions}
										className="d-flex flex-column"
									/>
									<FormikControl
										control="textarea"
										label="健康情況:*"
										name="healthCondition"
										placeholder="例子:良好, 沒有疾病"
									/>
									<div className="d-flex">
										<FormikControl
											control="radio"
											label="售賣或領養性質:*"
											name="sellOrFreeOptions"
											options={sellOrFreeOptions}
											onClick={() => {values.animalPrice = ''}}
											className="d-flex "
										/>
									</div>
									{(values.sellOrFreeOptions === "sell" || values.sellOrFreeOptions ==="paidAdoption" )&& (<FormikControl
													control="input"
										label="價錢或補償: ($港幣HKD)"
										type="text"
													name="animalPrice"
													placeholder="默認港幣HKD"
													size="2"
										/>)}
									<FormikControl
										control="textarea"
										label="詳細資料:*"
										name="description"
										placeholder="例如: 來歷, 受過的照顧, 性格, 特別注意事項..."
									/>

									<FormikControl
										control="textarea"
										label="對領養者的要求:*"
										name="requirementToAdopter"
										placeholder="例子: 愛護貓咪, 承諾只餵食生肉或罐頭, 不餵乾糧, 有防貓網, 每日可陪伴最少20分鐘...  "
									/>
									{/* <FormikControl
										control="checkbox"
										label="Checkbox topics"
										name="checkboxOptions"
										options={checkboxOptions}
									/> */}
									<FormikControl
										control="textarea"
										label="聯絡方法:*"
										name="contactInfo"
										placeholder="電話, email, Whatsapp, Instagram, Wechat..."
									/>

									<FormikControl
										control="textarea"
										label="交收方法:*"
										name="deliveryInfo"
										placeholder="例子: 最好油尖旺區, 平日晚上8點後, 需自備盒子運載寵物...  "
									/>

									<div className="d-flex justify-content-around">
										{props.animalToBeUpdated && <Button onClick={props.closeUpdateAnimalModalHandler} className='bg-danger btn-danger'>取消</Button>}
										<Button type="submit">{props.animalToBeUpdated ? '提交修改' : '提交'}</Button>
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
