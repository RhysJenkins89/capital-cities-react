import ContinentData from "../types/ContinentData";
import CountryData from "../types/CountryData";

// This needs to be refactored. At the moment, I get the data for the whole continent, but then I return the data for only one country, meaning that every time the app re-renders, I get the data for the continent. Instead, I need to get the continent data, save it in state, and then get a random country from that state storage. Or something like that anyway.

// To confirm, after checking the network tab on the dev tools, the above is what is happening. I make the request on each render.

// prettier-ignore
const getRandomCountryData = async (continent: string): Promise<CountryData> => {
    let url: string;
    if (!continent) {
        url = `https://cities-api.rhysjenkins.uk/europe`;
    } else {
        url = `https://cities-api.rhysjenkins.uk/${continent}`;
    }
    const data: Response = await fetch(url);
    const continentData: ContinentData = await data.json();
    // This function should end here. The data should be stored in state, and I get a random country each time the user hits the button.
    const objectKeys: string[] = Object.keys(continentData);
    const randomCountry: string =
        objectKeys[Math.floor(Math.random() * objectKeys.length)];
    return {
        countryName: randomCountry,
        countryInfo: continentData[randomCountry],
    };
};

export default getRandomCountryData;
