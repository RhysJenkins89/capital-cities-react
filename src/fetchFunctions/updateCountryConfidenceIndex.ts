const updateCountryConfidenceIndex = async (countryId: string) => {
    // Send the id of the country
    try {
        const response: Response = await fetch("", {
            method: "POST",
            body: JSON.stringify({ test: "test-data" }),
        });
    } catch (error) {
        console.error("Error: ", error);
    }
};

export default updateCountryConfidenceIndex;
