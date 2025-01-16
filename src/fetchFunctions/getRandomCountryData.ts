import { UseQueryOptions } from "@tanstack/react-query";

const getRandomCountryData = async (
    queryData: UseQueryOptions
): Promise<any> => {
    // Without type checking, this isn't a prudent function. If the parameter isn't a string, the function will error.
    // Add TypeScript.
    let url: string;
    if (!queryData.meta) {
        url = `./data/europe.json`;
    } else {
        url = `./data/${queryData.meta}.json`;
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
