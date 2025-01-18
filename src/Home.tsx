import { useState, useRef } from "react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import getRandomCountryData from "./fetchFunctions/getRandomCountryData";
import ChildCom from "./SelectContinent";
import SelectContinent from "./SelectContinent";

const Home = () => {
    const [showAnswer, setShowAnswer] = useState(false);
    const [showNextQuestionButton, setShowNextQuestionButton] = useState(false);
    const [continent, setContinent] = useState("Europe");

    const handleDataFromChild = (continentData: string) => {
        console.log("continent data from child:", continentData);
        setContinent(continentData);
    };

    // Think about the caching of this data. I don't want to refetch data that I already have.
    const { isPending, error, data, refetch } = useQuery({
        queryKey: [continent],
        queryFn: () => getRandomCountryData(continent),
    });

    if (isPending) return "Loading...";

    if (error) return "An error has occurred: " + error.message;

    const handleRevealAnswer = () => {
        setShowAnswer(true);
        setShowNextQuestionButton(true);
    };

    function handleNextQuestion() {
        setShowAnswer(false);
        setShowNextQuestionButton(false);
        refetch();
    }

    const getAsiaData = () => {
        // Update the current continent text
        // Get the data for Asia
        // const asiaData: UseQueryResult = useQuery({
        //     queryKey: ["asiaData"],
        //     queryFn: () => getRandomCountryData("asia"),
        // });
        // This is want I want to do:
        // Can I just call useQuery again, passing in new data? That way, the page will re-render with all the new data that I need.
        // Could I call a function that itself calls useQuery, passing in the data that I need?
    };

    return (
        <div>
            <h1>Capital cities</h1>
            <p>Select continent:</p>
            <SelectContinent
                sendDataToParent={handleDataFromChild}
                currentContinent={continent}
            />
            <p>
                What is the capital of{" "}
                {data.countryInfo.definiteArticle ? "the " : null}
                {data.countryName}?
            </p>
            <button onClick={handleRevealAnswer}>Reveal answer</button>
            {showAnswer ? <p>{data.countryInfo.capital}</p> : <p></p>}
            {showNextQuestionButton ? (
                <button onClick={handleNextQuestion}>Next question</button>
            ) : null}
        </div>
    );
};

export default Home;
