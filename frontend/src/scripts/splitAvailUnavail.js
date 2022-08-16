export default function splitAvailUnavail(data) {
    let availAdoptData = [];
    let unavailPauseAdoptData = [];
    let unavailSuccessData = [];
    console.log(data);
    data.forEach(animal => {
        if (animal.availableForAdoption === true) {
            availAdoptData.push(animal);
        } else if (animal.availableForAdoption === false) {
            switch (animal.adoptionSuccessful) {
                case true:
                    unavailSuccessData.push(animal);
                    break
                case false: //happen twice, both for FaFa and Soybean, why????
                    unavailPauseAdoptData.push(animal);
                    break
                default:
                    break
            }
        }
    })
    console.log('availAdoptData', availAdoptData);
    console.log('unavailPauseAdoptData',unavailPauseAdoptData);
    console.log('unavailSuccessData',unavailSuccessData);

    return availAdoptData.concat(unavailPauseAdoptData, unavailSuccessData);
}