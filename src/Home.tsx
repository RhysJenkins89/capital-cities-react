import { useState, useRef } from "react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import getRandomCountryData from "./fetchFunctions/getRandomCountryData";

const Home = () => {
    const [showAnswer, setShowAnswer] = useState(false);
    const [showNextQuestionButton, setShowNextQuestionButton] = useState(false);

    const { isPending, error, data, refetch } = useQuery({
        queryKey: ["europeData"],
        queryFn: () => getRandomCountryData("europe"),
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

    // I should probably have one function for all fetch calls, but I'll come to that later
    const getAsiaData = () => {
        // Update the current continent text
        // Get the data for Asia
        // const asiaData: UseQueryResult = useQuery({
        //     queryKey: ["asiaData"],
        //     queryFn: () => getRandomCountryData("asia"),
        // });
        // Can I just call useQuery again, passing in new data? That way, the page will re-render with all the new data that I need.
        // Could I call a function that itself calls useQuery, passing in the data that I need?
    };

    // I'll need another useQuery that fetches data from a different route.

    return (
        <div>
            <h1>Capital cities</h1>
            <p>Select continent:</p>
            <div>
                <button>Europe</button>
                <button onClick={getAsiaData}>Asia</button>
                <button>Africa</button>
            </div>
            <p>
                Current continent: <span>Europe</span>
            </p>
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
