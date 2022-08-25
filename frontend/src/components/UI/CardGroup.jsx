import axios from 'axios';
import { useState } from 'react';
import { Card, Row, Col, Button, Carousel,  } from 'react-bootstrap';
import AnimalDetailsModal from '../AnimalDetailsModal';
import { v4 as uuidv4 } from 'uuid';
import currentAgeCalChinese from '../../scripts/currentAgeCal';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useContext } from 'react';
import { QueryContext } from '../../Context/QueryContext';
import { cnTrans } from '../../scripts/cnTrans';
import { dateStringToDDMMYY } from '../../scripts/dateStringToDDMMYY';
import shuffleArray from '../../scripts/shuffleArray';
import ConfirmModal from './ConfirmModal';
import { queryAnimalTypeFilter } from '../../scripts/queryAnimalTypeFilter';
import splitAvailUnavail from '../../scripts/splitAvailUnavail';
import { checkHaveShadow, shadowAssigner } from '../../scripts/shadowController';
import UpdateAnimalModal from './UpdateAnimalModal';



const initialSlidersState = {};
const cardsModelState = {};
let onceFor = 0;


const CardGroup = ({user}) => {
	const navigate = useNavigate();
	const { queryContext, setQueryContext } = useContext(QueryContext)
	const [data, setData] = useState([]); //This is for initiating data as empty to ready to GET data
	const [loadingOrError, showLoadingOrError] = useState('loading...'); //This is for show loading if GET not completed
	const [show, setShow] = useState(false); //This is for showing modal or not, initial value is not show
	const [controlNumber, setControlNumber] = useState(null);
	const [slidersState, setSlidersState] = useState(initialSlidersState);
	const [confirmModalShow, setConfirmModalShow] = useState(false);
	const [updateAnimalModalShow, setUpdateAnimalModalShow] = useState(false);
    // const { setQueryContext } = useContext(QueryContext);

	// console.log('RENDER RENDER RENDER_------------------------------------------------');
	// console.log('latest shadow', shadow);
	console.log('data', data);
	// console.log('DATA', data);
	// console.log('QUERY_CONTEXT', queryContext);
	// console.log('PROPS.QUERY',props.query);
	const handleShow = (index) => {
		// console.log('HANDLE_SHOW:control number:', index);
		setShow(true);
		setControlNumber(index);
	};
	const handleClose = () => {
		setShow(false);
		for (let i = 0; i < data.length; i++) {
			cardsModelState[i] = false;
			onceFor = 0;
		}
	};

	const closeUpdateAnimalModalHandler = () => {
		setUpdateAnimalModalShow(false);
	}


	const handleConfirmModalClose = (index) => {
		setConfirmModalShow(false);
	}

	const confirmHandler = ({ index=null, option=null }) => {
		switch (option) {
			case 'delete':
				console.log('deleting...');
				deleteAdoptionHandler(index)
			case 'updateSuccess':
				// adoptionSuccessHandler(index, 'updateSuccess', false)
				updateAnimalHandler({ index: index, option:option, avail:false})
			default:
				break
		}
	}

	const updateAnimalHandler = ({ index = null, option = null, avail = null, animalId = null, updateContent = null }) => {
		let body = {}
		switch (option) {
			case 'updateAvail':
				body = { option: option, updateContent: { availableForAdoption: avail } }
				break;
			case 'updateSuccess':
				body = { option: option, updateContent: { availableForAdoption: avail,adoptionSuccessful: true,  } }
				break;
			case 'updateAnimalInfo':
				console.log('hi')
				body = { option: option, updateContent:updateContent}
				break;
			default:
				break
		}

		console.log('BODY', body)
		console.log(animalId)


		axios.put('/api/adoptions/', { animalId: (animalId? animalId:data[index]._id), ...body })
			.then((res) => {
				if (option === 'updateAvail' || option === 'updateSuccess') {
					data[index].shadow = { shadow: !avail, option: option }
					option === 'updateSuccess' && setConfirmModalShow(false)	//update shadow, !avail is because it is NOT avial for adoption(false), then shadow is true
				}
				setData([...data])
				console.log(res.data)
				if (option === 'updateAnimalInfo') {
					window.open('http://localhost:3000/', '_self');
				}
			}).catch((error)=>{console.log(error)}
			)
	}

	const deleteAdoptionHandler = (index) => {
		axios.delete(`/api/adoptions/${data[index]._id}`)
			.then((msg) => {
				console.log(msg)
				setConfirmModalShow(false);
				window.location.reload(false);
			}).catch((msg) => {
				navigate('deletefail')
			})

	}
	const [carouselIndex, setCarouselIndex] = useState(null);
	const handleSelect = (selectedIndex, e) => {
		// console.log('HANDLE_SELECT', selectedIndex);
		setCarouselIndex(selectedIndex);
	};



	useEffect(() => {
		axios
			.get('/api/adoptions/')
			.then((values) => {
				console.log('values.data:', values.data);
				let sortedData;
				console.log('QUERY', queryContext)
				if(queryContext){
					if (queryContext.option === 'searchAnimalByType') {
						sortedData = queryAnimalTypeFilter(values.data, queryContext)
					} else if (queryContext.option === 'searchAnimalByUserNickName') {
						sortedData = queryAnimalTypeFilter(values.data, queryContext)
					}
				}else {
					sortedData = shuffleArray(values.data)
				}
				setData(shadowAssigner(splitAvailUnavail(sortedData)))

			}).then(()=>showLoadingOrError(''))
			.catch((err) => {
				console.log(err);
				showLoadingOrError(err.message);
			});
	}, [queryContext])

	for (let i = 0; i < data.length; i++) {
		initialSlidersState[i] = 0;
	}
	if (onceFor === 0) {
		for (let i = 0; i < data.length; i++) {
			cardsModelState[i] = false;
			onceFor++;
		}
	}
	const handleCardsModelState = (index) => {
		cardsModelState[index] = true;
	};

	const nextSlide = (sliderId, numOfImg) =>
		setSlidersState((prev) => {
			const currentIndex = prev[sliderId];
			let newIndex;
			if (currentIndex === numOfImg) {
				newIndex = numOfImg;
			} else {
				newIndex = currentIndex + 1;
			}
			return { ...prev, [sliderId]: newIndex };
		});
	const previousSlide = (sliderId, numOfImg) =>
		setSlidersState((prev) => {
			const currentIndex = prev[sliderId];
			let newIndex;
			if (currentIndex === 0) {
				newIndex = 0;
			} else {
				newIndex = currentIndex - 1;
			}
			return { ...prev, [sliderId]: newIndex };
		});

	const noResultParagraph = () => {
		return(
			<h1>沒有搜尋結果, 可能你要的動物不存在, 或者擴大搜索範圍'</h1>
			)
	}

	return (
		<>
			{loadingOrError && <div>{loadingOrError}</div>}
			<Row xs={1} md={2} lg={3} xl={4} className="no_padding" >
				{(data.length === 0) ? noResultParagraph() :
					data.map((animal, index) => (
					<Col className='no_padding'>
						<Card
							className={`no_padding shadow ${animal.shadow && "backdrop"} ${(animal.availableForAdoption === false) && "backdrop"}`}>
							{/* <div>animal.availableForAdoption: {animal.availableForAdoption.toString()}</div> */}
							{/* <div>animal.adoptionSuccessful: {animal.adoptionSuccessful.toString() }</div> */}
							{checkHaveShadow(animal) && <div className="backdrop
							align-items-baseline h-100 w-100 ">
								<div className='fs-1 fw-bold m-5' >
									{animal.shadow && animal.shadow.option === "updateAvail" &&
									<div>
										<div className='h-100 m-4 text-warning '>暫停開放</div>
											<div onClick={() =>
													updateAnimalHandler({ index:index, option:'updateAvail', avail:true})
											} className='h-100 m-4 reopen'>按此重新開放</div>
										</div>}

									{animal.shadow && animal.shadow.option === "updateSuccess" &&
									<div>
										<div className='h-100 m-4 text-info '>已完成交易/領養</div>
										</div>}
								</div>
							</div>}
							<Carousel
								key={index}
								onSelect={() => handleSelect(index)}
								touch={true}
								controls={true}
								indicators={false}
								interval={null}
								activeIndex={slidersState[index]}
								nextIcon={
									<span
										key={uuidv4()}
										aria-hidden="true"
										className="carousel-control-next-icon"
										onClick={() => {
											nextSlide(index, animal.animalImages.length - 1);
										}}
									/>
								}
								prevIcon={
									<span
										key={uuidv4()}
										aria-hidden="true"
										className="carousel-control-prev-icon"
										onClick={() =>
											previousSlide(index, animal.animalImages.length - 1)
										}
									/>
								}
							>
								{animal.animalImages.map((img, index) => {
									img = img.replace(
										'/upload',
										'/upload/w_1000,ar_1:1,c_fill,g_auto'
									);
									return (
										<Carousel.Item>
											<img
												key={uuidv4()}
												className="d-block w-100"
												src={img}
												alt="Slides"
											/>
										</Carousel.Item>
									);
								})}
							</Carousel>
							<Card.Body >
								<Card.Text>
									品种:{' '}
									{`${animal.animalSpeciesName}<${
										animal.animalSpecies ? `${cnTrans(animal.animalSpecies)}<` : ''
									}${animal.animalGenera ? `${cnTrans(animal.animalGenera)}<` : ''}${
										animal.animalClasses ? `${cnTrans(animal.animalClasses)}` : ''
									}
										`}
									<br />
									名字: {animal.animalName}
									<br />
									性別: {cnTrans(animal.animalSex)}
									<br />
									年齡:{' '}
									{currentAgeCalChinese(animal.postDate, animal.animalAge)}
									<br />
										{((animal.urgencyOptions === "urgent") || (animal.urgencyOptions === "mostUrgent")) &&
											<div>緊急程度: <span className='fw-bold' style={{ color: '#FF0000' }}>{cnTrans(animal.urgencyOptions)}</span></div>}
									{animal.animalPrice?<div>價錢或補償: <span className='fw-bold'>${animal.animalPrice} HKD</span></div>:<div>價錢或補償: <span className='fw-bold'>免費領養</span></div>}
										用戶名稱: <span onClick={() => { setQueryContext({ user: animal.creator.nickname, option: 'searchAnimalByUserNickName' }) }}
											className='text-decoration-underline'
											style={{ cursor: 'pointer', color: '#663366' }}>
											{animal.creator.nickname}</span>
									<br />

									張貼日期: {dateStringToDDMMYY(animal.postDate)}
									{/* 張貼日期: {animal.postDate.toLocaleDateString()} */}

								</Card.Text>

								<div className="d-flex flex-wrap justify-content-center">
									<Button
										className=" m-2"
										key={uuidv4()}
										variant="primary"
										onClick={() => {
											handleShow(carouselIndex);
											handleCardsModelState(index);
											handleSelect(index);
											}}
									>
										<i className="fa-solid fa-hand-point-right">
											&ensp;詳情及聯絡方法
										</i>
									</Button>
									{(animal.creator)?(user.nickname === animal.creator.nickname && <div><Button
										className=" m-2"
										key={uuidv4()}
										variant="info"
										onClick={() => {
											setUpdateAnimalModalShow({index:index, option:'updateAnimal'});
										}}
									>
										更新資料
									</Button>


									<Button
										className=" m-2"
										key={uuidv4()}
										variant="warning"
										onClick={() => {
											updateAnimalHandler({ index: index, option: 'updateAvail', avail: false })
										}}
									>
										暫停開放
									</Button>
									<Button
										className=" m-2"
										key={uuidv4()}
										variant="danger"
											onClick={() => {
												setConfirmModalShow({index:index, option:'delete'});

											// deleteAdoptionHandler(index)
										}}
									>
										刪除
									</Button>
									<Button
										className=" m-2"
										key={uuidv4()}
										variant="success"
										onClick={() => {
											setConfirmModalShow({ index: index, option: 'updateSuccess' })
										}}
									>
										完成領養
									</Button></div>):<div></div>}

								</div>
								</Card.Body>
						</Card>
						{cardsModelState[index] === true && (
							<AnimalDetailsModal
								key={uuidv4()}
								handleShow={handleShow}
								handleClose={handleClose}
								animal={animal}
								index={index}
								controlNumber={controlNumber}
								cardsModelState={cardsModelState}
							/>
						)}
						{confirmModalShow &&
							<ConfirmModal
								closeHandler={handleConfirmModalClose}
								confirmHandler={confirmHandler}
								index={confirmModalShow.index}
								option={confirmModalShow.option} />}
						{updateAnimalModalShow && updateAnimalModalShow.index === index &&
							<UpdateAnimalModal
							index={updateAnimalModalShow.index}
							animal={data[updateAnimalModalShow.index]}
							option={updateAnimalModalShow.option}
								updateAnimalHandler={updateAnimalHandler}
								closeUpdateAnimalModalHandler={closeUpdateAnimalModalHandler}
/>}
					</Col>
				))}
			</Row>

		</>
	);
};



export default CardGroup;
