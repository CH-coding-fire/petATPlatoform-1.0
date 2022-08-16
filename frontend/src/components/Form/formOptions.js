	const urgencyOptions = [
		{ key: '不緊急', value: 'notUrgent' },
		{ key: '半緊急 (需1-3個月內領走)', value: 'slightlyUrgent' },
		{ key: '緊急 (需1-3個星期內領走)', value: 'urgent' },
		{ key: '非常緊急 (需幾天內領走)', value: 'mostUrgent' },
	];

	const sexOptions = [
		{ key: '雄性', value: 'male' },
		{ key: '雌性', value: 'female' },
		{ key: '不明/不適用', value: 'unknownSexOrNa' },
	];

	const sellOrFreeOptions = [
		{ key: '售賣', value: 'sell' },
		{ key: '免費領養', value: 'freeAdoption' },
		{ key: '領養但會收取金錢補償', value: 'paidAdoption' },

		// {key: '有償領養'}
	];



	// const checkboxOptions = [
	// 	{ key: '本人為義工', value: 'cOption1' },
	// 	{ key: 'Option 2', value: 'cOption2' },
	// 	{ key: 'Option 3', value: 'cOption3' },
	// ];

	const goLevel3classification = ['rodents'];

	const notGoSpeciesNameForm = ['others', 'plants', 'birds'];

    module.exports = {
        urgencyOptions,sexOptions, sellOrFreeOptions, goLevel3classification, notGoSpeciesNameForm}
    

