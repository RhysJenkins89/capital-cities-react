const getRandomCountryData = async (queryData) => {
    // Without type checking, this isn't a prudent function. If the parameter isn't a string, the function will error.
    // Add TypeScript.
    let url;
    if (!queryData.meta) {
        url = `./data/europe.json`;
    } else {
        url = `./data/${queryData.meta}.json`;
    }
    const data = await fetch(url);
    const continentData = await data.json();
    const objectKeys = Object.keys(continentData);
    const randomCountry =
        objectKeys[Math.floor(Math.random() * objectKeys.length)];
    return {
        countryName: randomCountry,
        countryData: continentData[randomCountry],
    };
};

export default getRandomCountryData;
