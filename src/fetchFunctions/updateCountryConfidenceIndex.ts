const updateCountryConfidenceIndex = async (countryId: string) => {
    try {
        const response: Response = await fetch("http://localhost:3000/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ countryId: countryId }),
        });
        const resData = await response.json();
    } catch (error) {
        console.error("Error: ", error);
    }
};

export default updateCountryConfidenceIndex;
