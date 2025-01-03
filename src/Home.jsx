import React from "react";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
    const getEuropeData = async () => {
        const data = await fetch("./data/europe.json");
        const europeData = await data.json();
        return europeData;
    };

    const { isPending, error, data } = useQuery({
        queryKey: ["europeData"],
        queryFn: getEuropeData,
    });

    if (isPending) return "Loading...";

    if (error) return "An error has occurred: " + error.message;

    console.log("Europe data:", data);

    return (
        <div>
            <h1>Capital cities</h1>
            <p>What is the capital of France?</p>
        </div>
    );
};

// async () => {
//     const data = await fetch("./data/europe.json");
//     const europeData = await data.json();
// }

export default Home;
