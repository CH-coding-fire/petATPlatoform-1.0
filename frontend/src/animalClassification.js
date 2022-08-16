export const animalClassifier = (classification) => {
	switch (classification) {
		case 'mammals':
			return mammalsSubset;
		case 'reptiles':
			return reptilesSubset;
		case 'amphibians':
			return amphibiansSubset;
		case 'rodents':
			return rodentsSubset;
		case 'insectsOrInvertebrate':
			return insectsOrInvertebrateSubset;
		case 'fishOrAquatic':
			return fishOrAquaticSubset;
		default:
			return [];
	}
};

export const animalClassesOptions = [
	{ key: 'Select an option', value: '' },
	{ key: '哺乳類', value: 'mammals' },
	{ key: '爬蟲類', value: 'reptiles' },
	{ key: '兩棲類', value: 'amphibians' },
	{ key: '鳥類', value: 'birds' },
	{ key: '昆蟲或無脊椎動物', value: 'insectsOrInvertebrate' },
	{ key: '魚類或水中生物', value: 'fishOrAquatic' },
	{ key: '植物', value: 'plants' },
	{ key: '其他', value: 'others' },
];

export const mammalsSubset = [
	{ key: 'Select an option', value: '' },
	{ key: '貓', value: 'cats' },
	{ key: '狗', value: 'dogs' },
	{ key: '鼠類', value: 'rodents' },
	{ key: '兔子', value: 'rabbits' },
	{ key: '蝟科', value: 'erinaceidae' },
	{ key: '其他', value: 'others' },
];

export const amphibiansSubset = [
	{ key: 'Select an option', value: '' },
	{ key: '青蛙', value: 'frogs' },
	{ key: '蟾蜍', value: 'toads' },
	{ key: '蠑螈', value: 'salamanders' },
	{ key: '其他', value: 'others' },
];

export const reptilesSubset = [
	{ key: 'Select an option', value: '' },
	{ key: '蛇', value: 'snakes' },
	{ key: '蜥蜴', value: 'lizards' },
	{ key: '龜', value: 'turtles' },
	{ key: '其他', value: 'others' },
];

export const insectsOrInvertebrateSubset = [
	{ key: 'Select an option', value: '' },
	{ key: '螞蟻', value: 'ants' },
	{ key: '蠍子', value: 'scorpions' },
	{ key: '螳螂', value: 'mantis' },
	{ key: '蟋蟀', value: 'crickets' },
	{ key: '蜘蛛', value: 'spiders' },
	{ key: '甲蟲', value: 'beetles' },
	{ key: '其他', value: 'others' },
]

export const rodentsSubset = [
	{ key: 'Select an option', value: '' },
	{ key: '倉鼠', value: 'hamsters' },
	{ key: '天竺鼠', value: 'guineaPigs' },
	{ key: '花枝鼠', value: 'mouses' },
	{ key: '沙鼠', value: 'gerbils' },
	{ key: '其他', value: 'others' },
];

export const fishOrAquaticSubset = [
	{ key: 'Select an option', value: '' },
	{ key: '淡水類', value: 'freshwater' },
	{ key: '海水類', value: 'seawater' },
];

