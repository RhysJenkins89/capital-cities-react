import { React, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import getEuropeData from "./fetchFunctions/getEuropeData";

const Home = () => {
    const [continentData, setContinentData] = useState({});
    const [currentCountry, setCurrentCountry] = useState("");

    const { isPending, error, data } = useQuery({
        queryKey: ["europeData"],
        queryFn: getEuropeData,
    });

    if (isPending) return "Loading...";

    if (error) return "An error has occurred: " + error.message;

    // console.log("europeData", data);
    // console.log("europeData entries", Object.entries(data));

    // setContinentData(data);

    // useEffect(() => {
    //     const getRandomCountry = () => {
    //         const objectKeys = Object.keys(data);
    //         console.log("objectKeys", objectKeys);
    //         const randomCountry =
    //             objectKeys[Math.floor(Math.random() * objectKeys.length)];
    //         console.log("random country:", randomCountry);
    //         setCurrentCountry(randomCountry);
    //     };

    //     getRandomCountry();
    // }, []);

    function handleRevealAnswer() {
        console.log("The user clicked reveal answer.");
    }

    return (
        <div>
            <h1>Capital cities</h1>
            <p>What is the capital of France?</p>
            <button onClick={handleRevealAnswer}>Reveal answer</button>
            {/* {Object.entries(data).map((item, index) => {
                // console.log(item);
                return <p key={index}>{item[0]}</p>;
            })} */}
        </div>
    );
};

export default Home;
