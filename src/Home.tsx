import { useState, useRef, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AppContext } from "./Context";
import getRandomCountryData from "./fetchFunctions/getRandomCountryData";
import SelectContinent from "./SelectContinent";
import UserLogin from "./UserLogin";
import UserSignup from "./UserSignup";
import ContinentName from "./types/ContinentName";

const Home: React.FC = () => {
    const [showAnswer, setShowAnswer] = useState<boolean>(false);
    const [showNextQuestionButton, setShowNextQuestionButton] =
        useState<boolean>(false);
    const [continent, setContinent] = useState<string>(
        window.localStorage.getItem("lastUserContinentSelection") || "europe"
    );
    const [showLogin, setShowLogin] = useState<boolean>(false);
    const [showSignup, setShowSignup] = useState<boolean>(false);

    // App context
    const context = useContext(AppContext);

    if (!context) {
        throw new Error(
            "Use this component inside of the AppContextProvider component."
        );
    }

    const { userIsLoggedIn } = context;

    // Get country data
    const { isPending, error, data, refetch } = useQuery({
        queryKey: [continent],
        queryFn: () => getRandomCountryData(continent),
    });

    if (isPending)
        return "Loading... This project runs on a free tier of Render, which means that the server will spin down with inactivity. If you're here for the first time, it'll take roughly a minute to load.";

    if (error) return "An error has occurred: " + error.message;

    // Component functions
    const handleRevealAnswer = () => {
        setShowAnswer(true);
        setShowNextQuestionButton(true);
    };

    const handleNextQuestion = () => {
        setShowAnswer(false);
        setShowNextQuestionButton(false);
        refetch();
    };

    const handleUserContinentSelection = (
        continentData: ContinentName["name"]
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
            {/* {userIsLoggedIn && <p>User is logged in</p>} */}
            {/* <div>
                <button onClick={() => setShowLogin(!showLogin)}>
                    {showLogin ? "Hide login" : "Show login"}
                </button>
            </div>
            {showLogin && <UserLogin />} */}
            {/* <div>
                <button onClick={() => setShowSignup(!showSignup)}>
                    {showSignup ? "Hide signup" : "Show signup"}
                </button>
            </div>
            {showSignup && <UserSignup />} */}
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
