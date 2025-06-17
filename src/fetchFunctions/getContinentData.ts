const API_URL = import.meta.env.VITE_API_URL;
import CountryData from "../types/CountryData";

const getContinentData = async (continent: string) => {
    // continent
    //     ? (url = `https://cities-api.rhysjenkins.uk/${continent}`)
    //     : (url = `https://cities-api.rhysjenkins.uk/europe`);
    // continent ? (url = `http://localhost:3000/${continent}`) : (url = `http://localhost:3000/europe`);
    // I absolutely must setup dev and production environments
    try {
        let url: string;
        continent ? (url = `${API_URL}/${continent}`) : (url = `${API_URL}/europe`);
        const data: Response = await fetch(url);
        const continentData: CountryData[] = await data.json();
        return continentData;
    } catch (error) {
        console.log("An error occured while fetching the data:", error);
    }
};

export default getContinentData;
