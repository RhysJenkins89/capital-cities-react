import { React, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import getEuropeData from "./fetchFunctions/getEuropeData";

const Home = () => {
    const [currentCountry, getCurrentCountry] = useState("");

    const { isPending, error, data } = useQuery({
        queryKey: ["europeData"],
        queryFn: getEuropeData,
    });

    if (isPending) return "Loading...";

    if (error) return "An error has occurred: " + error.message;

    // When should the below function run? Think about the lifecycle of the component.
    const getRandomCountry = () => {
        console.log("Europe data:", data);
        const objectKeys = Object.keys(europeData);
        console.log("objectKeys", objectKeys);
        // const randomCountry =
        //     objectKeys[Math.floor(Math.random() * objectKeys.length)];
    };

    getRandomCountry();

    return (
        <div>
            <h1>Capital cities</h1>
            <p>What is the capital of France?</p>
        </div>
    );
};

export default Home;
