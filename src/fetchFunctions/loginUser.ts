const API_URL = import.meta.env.VITE_API_URL;

type LoginUserTypes = {
    email: string;
    password: string;
};

const loginUser = async ({ email, password }: LoginUserTypes) => {
    // try {
    //     let url: string;
    //     continent ? (url = `${API_URL}/${continent}`) : (url = `${API_URL}/europe`);
    //     const data: Response = await fetch(url);
    //     const continentData: CountryData[] = await data.json();
    //     return continentData;
    // } catch (error) {
    //     console.log("An error occured while fetching the data:", error);
    // }
};

export default loginUser;
