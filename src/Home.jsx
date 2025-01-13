import { React, useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import getRandomCountryData from "./fetchFunctions/europe/getRandomCountryData";

const Home = () => {
    const [showAnswer, setShowAnswer] = useState(false);
    const [showNextQuestionButton, setShowNextQuestionButton] = useState(false);

    const { isPending, error, data, refetch } = useQuery({
        queryKey: ["europeData"],
        queryFn: getRandomCountryData,
    });

    if (isPending) return "Loading...";

    if (error) return "An error has occurred: " + error.message;

    function handleRevealAnswer() {
        setShowAnswer(true);
        setShowNextQuestionButton(true);
    }

    function handleNextQuestion() {
        setShowAnswer(false);
        setShowNextQuestionButton(false);
        refetch();
    }

    return (
        <div>
            <h1>Capital cities</h1>
            <p>Select continent:</p>
            <div>
                <button>Europe</button>
                <button>Asia</button>
                <button>Africa</button>
            </div>
            <p>
                Current continent: <span>Europe</span>
            </p>
            <p>
                What is the capital of{" "}
                {data.countryData.definiteArticle ? "the " : null}
                {data.countryName}?
            </p>
            <button onClick={handleRevealAnswer}>Reveal answer</button>
            {showAnswer ? <p>{data.countryData.capital}</p> : <p></p>}
            {showNextQuestionButton ? (
                <button onClick={handleNextQuestion}>Next question</button>
            ) : null}
        </div>
    );
};

export default Home;
