const API_URL = import.meta.env.VITE_API_URL;
import CountryData from "../types/CountryData";

const getContinentData = async (continent: string) => {
    try {
        console.log("API_URL:", API_URL);
        console.log("With continent:", `${API_URL}/${continent}`);
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
