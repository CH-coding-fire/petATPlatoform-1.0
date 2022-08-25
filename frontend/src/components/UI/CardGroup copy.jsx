// import { CardGroup } from 'react-bootstrap';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { Card, Row, Col, Button, Carousel } from 'react-bootstrap';
import sampleImage from '../../image/hamsterSamplePic.jpg';
import AnimalDetailsModal from '../AnimalDetailsModal';

const CardGroup = (props) => {
	const [data, setData] = useState([]);
	const [loadingOrError, showLoadingOrError] = useState('loading...');
	const [show, setShow] = useState(false);
	const [controlNumber, setControlNumber] = useState('');
	const handleShow = (index) => {
		// console.log(index);
		setShow(true);
		setControlNumber(index);
	};

	const handleClose = () => setShow(false);

	const [carouselIndex, setCarouselIndex] = useState(2);
	const handleSelect = (selectedIndex, e) => {
		console.log(selectedIndex);
		setCarouselIndex(selectedIndex);
	};

	const initialSlidersState = {};
	if (data.length == 0) {
		console.log('hi');
		axios
			.get('/api/adoptions/')
			.then((values) => {
				setData(values.data);
				showLoadingOrError('');
			})
			.catch((err) => {
				console.log(err);
				showLoadingOrError(err.message);
			});
	}

	for (let i = 0; i < data.length; i++) {
		initialSlidersState[i] = 0;
	}

	console.log(initialSlidersState);
	const [slidersState, setSlidersState] = useState(initialSlidersState);
	const nextSlide = (sliderId) =>
		setSlidersState((prev) => {
			const currentIndex = prev[sliderId];
			let newIndex;
			if (currentIndex === 2) {
				newIndex = 0;
			} else {
				newIndex = currentIndex + 1;
			}
			return { ...prev, [sliderId]: newIndex };
		});
	const previousSlide = (sliderId) =>
		setSlidersState((prev) => {
			const currentIndex = prev[sliderId];
			let newIndex;
			if (currentIndex === 0) {
				newIndex = 2;
			} else {
				newIndex = currentIndex - 1;
			}
			return { ...prev, [sliderId]: newIndex };
		});

	return (
		<>
			{loadingOrError && <div>{loadingOrError}</div>}
			<Row xs={1} md={2} lg={3} xl={4} className="g-4">
				{/* {Array.from({ length: 6 }).map(() => ( */}
				{data.map((animal, index) => (
					<Col>
						<Card className="shadow">
							<Carousel
								activeIndex={carouselIndex}
								onSelect={handleSelect}
								interval={null}
							>
								{animal.animalImages.map((img) => {
									return (
										<Carousel.Item>
											<img className="d-block w-100" src={img} alt="Slides" />
											<Carousel.Caption>
												<h3>First slide label</h3>
												<p>
													Nulla vitae elit libero, a pharetra augue mollis
													interdum.
												</p>
											</Carousel.Caption>
										</Carousel.Item>
									);
								})}
							</Carousel>

							<Card.Body>
								<Card.Title>仓鼠1号</Card.Title>
								<Card.Text>
									名字:
									{animal.animalName}
									<br />
									品种: 三线鼠
									<br />
									性別: {animal.animalSex}
									<br />
									年齡: {animal.animalAge.years}歲{animal.animalAge.months}月
								</Card.Text>
								<div className="d-flex justify-content-center">
									<Button
										variant="primary"
										onClick={() => handleShow(carouselIndex)}
									>
										詳細資料领养
									</Button>
								</div>
							</Card.Body>
						</Card>

						{show && (
							<AnimalDetailsModal
								handleShow={show}
								handleClose={handleClose}
								animal={animal}
								index={index}
								controlNumber={controlNumber}
							/>
						)}
					</Col>
				))}
			</Row>

			{/* <Modal
					show={show}
					onHide={handleClose}
					backdrop="static"
					keyboard={false}
				>
					<Modal.Header closeButton>
						<Modal.Title>Modal title</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						I will not close if you click outside me. Don't even try to press
						escape key.
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Close
						</Button>
						<Button variant="primary">Understood</Button>
					</Modal.Footer>
				</Modal> */}
		</>
	);
	// });
};

export default CardGroup;
