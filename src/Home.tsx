import { useState, useRef } from "react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import getRandomCountryData from "./fetchFunctions/getRandomCountryData";
import ChildCom from "./SelectContinent";
import SelectContinent from "./SelectContinent";

const Home = () => {
    const [showAnswer, setShowAnswer] = useState(false);
    const [showNextQuestionButton, setShowNextQuestionButton] = useState(false);
    const [continent, setContinent] = useState(""); // Default required

    // Render a component that accepts the continent data
    // Handle the continent selection in a state variable. When the user clicks on a new continent, update the state variable, which will cause the app to re-render, loading the component again with the new data.

    // const [dataFromChild, setDataFromChild] = useState("");

    const handleDataFromChild = (continentDataFromChild: string) => {
        console.log("continent data from child:", continentDataFromChild);
        setContinent(continentDataFromChild);
    };

    // return (
    //     <div>
    //         <h1>Data from Child: {dataFromChild}</h1>
    //         <Child sendDataToParent={handleDataFromChild} />
    //     </div>
    // );

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
            <SelectContinent sendDataToParent={handleDataFromChild} />
            <p>
                Current continent: <span>{continent}</span>
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
