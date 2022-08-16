export const queryAnimalTypeFilter = (data, queryContext) => {
    let queryData;
    if (queryContext.option === 'searchAnimalByType') {
        if (queryContext.animalSpecies !== '') {
            queryData = data.filter(animal => animal.animalSpecies === queryContext.animalSpecies)
        } else if (queryContext.animalGenera !== '') {
            queryData = data.filter(animal => animal.animalGenera === queryContext.animalGenera)
        } else {
            queryData = data.filter(animal => animal.animalClasses === queryContext.animalClasses)
        }
    }

    if (queryContext.option === 'searchAnimalByUserNickName') {
        // console.log('animal.creator', animal.creator);
        console.log('queryContext.creator', queryContext);
        queryData = data.filter(animal => animal.creator.nickname === queryContext.user)
    }

    return queryData
}