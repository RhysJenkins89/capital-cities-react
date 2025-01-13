const getRandomCountryData = async () => {
    const data = await fetch("./data/europe.json");
    const europeData = await data.json();
    const objectKeys = Object.keys(europeData);
    const randomCountry =
        objectKeys[Math.floor(Math.random() * objectKeys.length)];
    return {
        countryName: randomCountry,
        countryData: europeData[randomCountry],
    };
};

export default getRandomCountryData;
