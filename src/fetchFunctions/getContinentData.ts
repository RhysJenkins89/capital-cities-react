import ContinentData from "../types/ContinentData";

const getContinentData = async (continent: string) => {
    let url: string;
    if (continent) {
        url = `https://cities-api.rhysjenkins.uk/${continent}`;
    } else {
        url = `https://cities-api.rhysjenkins.uk/europe`;
    }
    const data: Response = await fetch(url);
    const continentData: ContinentData = await data.json();
    return continentData;
};

export default getContinentData;
