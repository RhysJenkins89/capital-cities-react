const updateCountryConfidenceIndex = async (countryId: string, userConfidence: number) => {
    console.log("Country id: ", countryId);
    console.log("User confidence: ", userConfidence);
    try {
        const response: Response = await fetch("http://localhost:3000/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                countryId: countryId,
                userConfidence: userConfidence,
            }),
        });
        const resData = await response.json(); // resData type
        return resData;
    } catch (error) {
        console.error("Error: ", error);
    }
};

export default updateCountryConfidenceIndex;
