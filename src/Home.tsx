import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import getRandomCountryData from "./fetchFunctions/getRandomCountryData";
import SelectContinent from "./SelectContinent";
// import useLocalStorage from "./customHooks/useLocalStorage";
// import useLocalStorageState from "use-local-storage-state";

const Home = () => {
    const [showAnswer, setShowAnswer] = useState(false);
    const [showNextQuestionButton, setShowNextQuestionButton] = useState(false);
    const [continent, setContinent] = useState(
        window.localStorage.getItem("lastUserContinentSelection") || "europe"
    );

    // const [todos, setTodos] = useLocalStorageState("todos", {
    //     defaultValue: ["buy avocado", "do 50 push-ups"],
    // });

    // const [continent, setContinent] = useLocalStorageState(
    //     "lastUserContinentSelection"
    // );

    const { isPending, error, data, refetch } = useQuery({
        queryKey: [continent],
        queryFn: () => getRandomCountryData(continent), // There must be something strange going on with caching here.
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
        window.localStorage.setItem(
            "lastUserContinentSelection",
            continentData
        );
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
