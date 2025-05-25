const updateCountryConfidenceIndex = async (userConfidence: number, countryId: string) => {
    console.log("User confidence: ", userConfidence);
    console.log("Country id: ", countryId);
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
        const resData = await response.json();
        return resData;
    } catch (error) {
        console.error("Error: ", error);
    }
};

export default updateCountryConfidenceIndex;
