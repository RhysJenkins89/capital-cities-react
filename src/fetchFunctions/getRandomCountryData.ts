import { UseQueryOptions } from "@tanstack/react-query";

const getRandomCountryData = async (continent: string): Promise<any> => {
    let url: string;
    if (!continent) {
        url = `./data/europe.json`;
    } else {
        url = `./data/${continent}.json`;
    }
    const data: Response = await fetch(url);
    const continentData = await data.json(); // Type
    const objectKeys: string[] = Object.keys(continentData);
    const randomCountry: string =
        objectKeys[Math.floor(Math.random() * objectKeys.length)];
    return {
        countryName: randomCountry,
        countryData: continentData[randomCountry],
    };
};

export default getRandomCountryData;
