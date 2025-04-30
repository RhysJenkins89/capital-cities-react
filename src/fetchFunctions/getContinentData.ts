import CountryData from "../types/CountryData";

const getContinentData = async (continent: string) => {
    try {
        let url: string;
        continent
            ? (url = `https://cities-api.rhysjenkins.uk/${continent}`)
            : (url = `https://cities-api.rhysjenkins.uk/europe`);
        const delay: Promise<void> = new Promise((resolve) =>
            setTimeout(resolve, 750)
        );
        const [data] = await Promise.all([fetch(url), delay]); // This delay is entirely for UX purposes.
        const continentData: CountryData[] = await data.json();
        return continentData;
    } catch (error) {
        console.log("An error occured while fetching the data:", error);
    }
};

export default getContinentData;
