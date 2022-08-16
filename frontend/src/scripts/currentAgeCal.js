// import { formatDistance, subDays, sub } from 'date-fns';
const {
	sub,
	differenceInMonths,
	differenceInYears,
	differenceInDays,
	intervalToDuration,
	set,
} = require('date-fns');

const seedPostDate = new Date(2022, 3, 1);
const seedAnimalAge = {
	years: '0',
	months: '0',
	days: '0',
};

const currentAgeCalChinese = (postDate, animalAge) => {
	const today = new Date();
	//To calculate birthday, it is postDate - entered animal age
	// console.log('postDate from db:', postDate);
	// console.log('animalAge from db:', animalAge);

	let parsedPostDate = new Date(postDate);

	const birthday = sub(parsedPostDate, animalAge);

	// console.log('calculated birthday is:', birthday);
	const realtimeAnimalAge = () => {
		return intervalToDuration({
			start: birthday,
			end: today,
		});
	};

	const chineseDateTransform = (realtimeAnimalAge) => {
		// return realtimeAnimalAge.years;
		return `${realtimeAnimalAge.years ? `${realtimeAnimalAge.years}歲, ` : ''}
            ${
							realtimeAnimalAge.months
								? `${realtimeAnimalAge.months}個月, `
								: ''
						}
        ${realtimeAnimalAge.days}天`.replace(/\s/g, '');
	};

	return chineseDateTransform(realtimeAnimalAge());
};

// console.log(currentAgeCalChinese(seedPostDate, seedAnimalAge));

export default currentAgeCalChinese;
