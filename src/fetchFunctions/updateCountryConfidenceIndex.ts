const updateCountryConfidenceIndex = async (countryId: string) => {
    console.log("Update country confidence function");
    // Send the id of the country
    try {
        const response: Response = await fetch("http://localhost:3000/update", {
            method: "PUT",
            body: JSON.stringify({ test: "test-data" }),
        });
        console.log("Response: ", response);
    } catch (error) {
        console.error("Error: ", error);
    }
};

export default updateCountryConfidenceIndex;
