type UpdateCountryConfidenceIndexInput = {
    continent: string;
    countryId: string;
    userConfidence: number;
};

const updateCountryConfidenceIndex = async ({
    continent,
    countryId,
    userConfidence,
}: UpdateCountryConfidenceIndexInput) => {
    try {
        const response: Response = await fetch("http://localhost:3000/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                continent: continent,
                countryId: countryId,
                userConfidence: userConfidence,
            }),
        });
        const resData = await response.json(); // resData type. In fact, the only response I need here is a success or a failure indicator.
        console.log("resData:", resData);
        return resData;
    } catch (error) {
        console.error("Error: ", error);
    }
};

export default updateCountryConfidenceIndex;
