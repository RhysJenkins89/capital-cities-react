import { useState, useRef } from "react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import getRandomCountryData from "./fetchFunctions/getRandomCountryData";
import ChildCom from "./SelectContinent";
import SelectContinent from "./SelectContinent";

const Home = () => {
    const [showAnswer, setShowAnswer] = useState(false);
    const [showNextQuestionButton, setShowNextQuestionButton] = useState(false);
    const [continent, setContinent] = useState("Europe");

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

    const handleNextQuestion = () => {
        setShowAnswer(false);
        setShowNextQuestionButton(false);
        refetch();
    };

    const handleUserContinentSelection = (continentData: string) => {
        setShowAnswer(false);
        setShowNextQuestionButton(false);
        setContinent(continentData);
    };

    return (
        <div>
            <h1>Capital cities</h1>
            <p>Select continent:</p>
            <SelectContinent
                continentSelectionCallback={handleUserContinentSelection}
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
