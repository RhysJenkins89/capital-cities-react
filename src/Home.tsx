import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import getRandomCountryData from "./fetchFunctions/getRandomCountryData";
import SelectContinent from "./SelectContinent";
// import useLocalStorage from "./customHooks/useLocalStorage";
// import useLocalStorageState from "use-local-storage-state";

// Coding is shockingly uncomplicated:
// 1. Write code.
// 2. Code doesn't work.
// 3. Don't know why.
// 4. Google the answer
// 5. Code works.
// 6. Don't know why.

// Repeat forever.

const Home = () => {
    const [showAnswer, setShowAnswer] = useState<boolean>(false);
    const [showNextQuestionButton, setShowNextQuestionButton] =
        useState<boolean>(false);
    const [continent, setContinent] = useState<string>(
        window.localStorage.getItem("lastUserContinentSelection") || "europe"
    );

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

    type ContinentData = {
        name: string;
    };

    const handleUserContinentSelection = (
        continentData: ContinentData["name"]
    ) => {
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
