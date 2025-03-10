import ContinentData from "../types/ContinentData";
import CountryData from "../types/CountryData";

const getRandomCountryData = async (
    continent: string
): Promise<CountryData> => {
    let url: string;
    if (!continent) {
        url = `https://cities-api.rhysjenkins.uk/europe`;
    } else {
        url = `https://cities-api.rhysjenkins.uk/${continent}`;
    }
    const data: Response = await fetch(url);
    const continentData: ContinentData = await data.json();
    const objectKeys: string[] = Object.keys(continentData);
    const randomCountry: string =
        objectKeys[Math.floor(Math.random() * objectKeys.length)];
    return {
        countryName: randomCountry,
        countryInfo: continentData[randomCountry],
    };
};

export default getRandomCountryData;
