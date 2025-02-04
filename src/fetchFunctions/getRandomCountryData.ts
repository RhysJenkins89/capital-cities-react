import ContinentData from "../types/ContinentData";
import CountryData from "../types/CountryData";

// prettier-ignore
const getRandomCountryData = async (continent: string): Promise<CountryData> => {
    // I'll need to include auth data with this request. One thing at a time. 
    let url: string;
    // To test, I'm serving random Europe data.
    if (!continent) {
        url = `https://cities-api.rhysjenkins.uk/europeRandom`;
    } else {
        url = `https://cities-api.rhysjenkins.uk/europeRandom`;
    }
    // ./data/${continent}.json
    const data: Response = await fetch(url);
    const continentData: ContinentData = await data.json();
    const objectKeys: string[] = Object.keys(continentData);
    const randomCountry: string = objectKeys[Math.floor(Math.random() * objectKeys.length)];
    return {
        countryName: randomCountry,
        countryInfo: continentData[randomCountry],
    };
};

export default getRandomCountryData;
