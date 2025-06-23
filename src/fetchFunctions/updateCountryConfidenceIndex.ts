const API_URL = import.meta.env.VITE_API_URL;

type UpdateCountryConfidenceIndexInput = {
    countryId: string;
    userConfidence: number;
};

const updateCountryConfidenceIndex = async ({ countryId, userConfidence }: UpdateCountryConfidenceIndexInput) => {
    try {
        const response: Response = await fetch(`${API_URL}/update`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                countryId: countryId,
                userConfidence: userConfidence,
            }),
        });
        const resData = await response.json(); // resData type. In fact, the only response I need here is a success or a failure indicator.
        return resData;
    } catch (error) {
        console.error("Error: ", error);
    }
};

export default updateCountryConfidenceIndex;
