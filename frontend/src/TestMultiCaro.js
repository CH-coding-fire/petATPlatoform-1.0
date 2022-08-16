import React from 'react';
import { Button, Carousel, Stack } from 'react-bootstrap';

const array = ['a', 'b', 'c', 'd', 'e', 'f'];
console.log(array.length);

const initialSlidersState = {};

for (let i = 0; i < array.length; i++) {
	initialSlidersState[i] = 0;
	console.log('times');
}

console.log(initialSlidersState); //{0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0}

const sampleInitialSlidersState = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

export default function TestMultiCaro() {
	const [slidersState, setSlidersState] = React.useState(
		sampleInitialSlidersState
	);
	const nextSlide = (sliderId) => {
		console.log('SLIDER_ID is:', sliderId);

		setSlidersState((prev) => {
			console.log('NEXT_SLIDE activated');
			const currentIndex = prev[sliderId];
			let newIndex;
			if (currentIndex === 2) {
				newIndex = 0;
			} else {
				newIndex = currentIndex + 1;
			}
			return { ...prev, [sliderId]: newIndex };
		});
	};
	const previousSlide = (sliderId) => {
		console.log('SLIDER_ID is:', sliderId);
		setSlidersState((prev) => {
			console.log('PREVIOUS_SLIDE ACTIVATED');

			const currentIndex = prev[sliderId];
			let newIndex;
			if (currentIndex === 0) {
				newIndex = 2;
			} else {
				newIndex = currentIndex - 1;
			}
			return { ...prev, [sliderId]: newIndex };
		});
	};

	// console.log(slidersState);

	return (
		<Stack
			gap={3}
			className="align-items-center justify-content-center min-vh-100"
		>
			{array.map((x, index) => (
				<Carousel
					touch={true}
					style={{ width: '18rem' }}
					controls={true}
					indicators={false}
					interval={null}
					activeIndex={slidersState[index]}
					nextIcon={
						<span
							aria-hidden="true"
							className="carousel-control-next-icon bg-danger"
							onClick={() => nextSlide(index)}
						/>
					}
					prevIcon={
						<span
							aria-hidden="true"
							className="carousel-control-prev-icon"
							onClick={() => previousSlide(index)}
						/>
					}
				>
					<Carousel.Item as="img" src="https://picsum.photos/id/10/600/400" />
					<Carousel.Item as="img" src="https://picsum.photos/id/20/600/400" />
					<Carousel.Item as="img" src="https://picsum.photos/id/30/600/400" />
				</Carousel>
			))}
			{/* <Stack direction="horizontal" gap={3} className="justify-content-center">
				<Button onClick={() => previousSlide(1)}>Previous</Button>
				<Carousel
					style={{ width: '18rem' }}
					controls={false}
					indicators={false}
					interval={null}
					activeIndex={slidersState[1]}
				>
					<Carousel.Item as="img" src="https://picsum.photos/id/10/600/400" />
					<Carousel.Item as="img" src="https://picsum.photos/id/20/600/400" />
					<Carousel.Item as="img" src="https://picsum.photos/id/30/600/400" />
				</Carousel>
				<Button onClick={() => nextSlide(1)}>Next</Button>
			</Stack>

			<Stack direction="horizontal" gap={3} className="justify-content-center">
				<Button onClick={() => previousSlide(2)}>Previous</Button>
				<Carousel
					style={{ width: '18rem' }}
					controls={false}
					indicators={false}
					interval={null}
					activeIndex={slidersState[2]}
				>
					<Carousel.Item as="img" src="https://picsum.photos/id/40/600/400" />
					<Carousel.Item as="img" src="https://picsum.photos/id/50/600/400" />
					<Carousel.Item as="img" src="https://picsum.photos/id/60/600/400" />
				</Carousel>
				<Button onClick={() => nextSlide(2)}>Next</Button>
			</Stack>

			<Stack direction="horizontal" gap={3} className="justify-content-center">
				<Button onClick={() => previousSlide(3)}>Previous</Button>
				<Carousel
					style={{ width: '18rem' }}
					controls={false}
					indicators={false}
					interval={null}
					activeIndex={slidersState[3]}
				>
					<Carousel.Item as="img" src="https://picsum.photos/id/70/600/400" />
					<Carousel.Item as="img" src="https://picsum.photos/id/80/600/400" />
					<Carousel.Item as="img" src="https://picsum.photos/id/90/600/400" />
				</Carousel>
				<Button onClick={() => nextSlide(3)}>Next</Button>
			</Stack> */}

			<Button>Back to home</Button>
		</Stack>
	);
}
