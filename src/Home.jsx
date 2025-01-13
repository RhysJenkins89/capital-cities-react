import { React, useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import getRandomCountryData from "./fetchFunctions/europe/getRandomCountryData";

const Home = () => {
    const [continentData, setContinentData] = useState({});
    const [currentCountry, setCurrentCountry] = useState("");

    const { isPending, error, data } = useQuery({
        queryKey: ["europeData"],
        queryFn: getRandomCountryData,
    });

    if (isPending) return "Loading...";

    if (error) return "An error has occurred: " + error.message;

    function handleRevealAnswer() {
        console.log("The user clicked reveal answer.");
    }

    return (
        <div>
            <h1>Capital cities</h1>
            <p>
                What is the capital of{" "}
                {data.countryData.definiteArticle ? "the " : null}
                {data.countryName}?
            </p>
            <button onClick={handleRevealAnswer}>Reveal answer</button>
        </div>
    );
};

export default Home;
