export const checkHaveShadow = (animal) => {
	if (animal.shadow) {
		if (animal.shadow.shadow === true)
			return true;
		else {
			return false
		}
	}
}



export const shadowAssigner = (dataArray) => {
					console.log('assigning shadow');
					for (let animal of dataArray) {
						if (animal.adoptionSuccessful === false && animal.availableForAdoption === false) {
							animal.shadow = { shadow: true, option: 'updateAvail' }
						}else if(animal.adoptionSuccessful === true && animal.availableForAdoption === false){
							animal.shadow = { shadow: true, option: 'updateSuccess' }
						}
					}
					console.log(dataArray);
					return dataArray
				}