const API_URL = import.meta.env.VITE_API_URL;
import CountryData from "../types/CountryData";
import Continent from "../types/Continent";

const getContinentData = async (continent: Continent): Promise<CountryData[]> => {
  try {
    const url: string = continent ? `${API_URL}/${continent}` : `${API_URL}/europe`;
    const data: Response = await fetch(url);
    const continentData: CountryData[] = await data.json();
    return continentData;
  } catch (error) {
    console.log("An error occured while fetching the data:", error);
    throw new Error("This is the error message from getContintentData.ts");
    // Note that this line will stop execution of the function and report that something went wrong.
    // Obviously, the error should be more meaningful than this.
  }
};

export default getContinentData;
