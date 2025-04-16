import { useState, useRef, useContext, useEffect, RefObject } from "react";
import { useQuery } from "@tanstack/react-query";
import { AppContext } from "./Context";
import getContinentData from "./fetchFunctions/getContinentData";
import SelectContinent from "./SelectContinent";
import UserLogin from "./UserLogin";
import UserSignup from "./UserSignup";
import ContinentName from "./types/ContinentName";
import CountryData from "./types/CountryData";

const Home: React.FC = () => {
    const [showAnswer, setShowAnswer] = useState<boolean>(false);
    const [showNextQuestionButton, setShowNextQuestionButton] =
        useState<boolean>(false);
    const [continent, setContinent] = useState<string>(
        window.localStorage.getItem("lastUserContinentSelection") || "europe"
    );
    const [showLogin, setShowLogin] = useState<boolean>(false);
    const [showSignup, setShowSignup] = useState<boolean>(false);
    const [randomCountryData, setRandomCountryData] =
        useState<CountryData | null>(null);
    const previousCountry: RefObject<string> = useRef<string>("");

    // App context
    const context = useContext(AppContext);

    if (!context) {
        throw new Error(
            "Use this component inside of the AppContextProvider component."
        );
    }

    const { userIsLoggedIn } = context;

    // Get country data
    const { isPending, error, data } = useQuery({
        queryKey: [continent],
        queryFn: () => getContinentData(continent),
        staleTime: Infinity,
        gcTime: Infinity,
    });

    // Check that @biomejs has been removed from the node modules

    // Write about:
    // The fetch request issue
    // The useEffect/hooks bug
    // chatGPT thinks that React.MutableRefObject is the correct type for a useRef object, but VS Code tells me that it's been deprecated

    useEffect(() => {
        if (!data) return;
        const objectKeys: string[] = Object.keys(data);
        const randomCountry: string =
            objectKeys[Math.floor(Math.random() * objectKeys.length)];
        setRandomCountryData({
            countryName: randomCountry,
            countryInfo: data[randomCountry],
        });
    }, [data]);

    if (isPending) {
        // Update only the country text when the user selects a new continent, not the whole app.
        return (
            <div>
                <h1>Capital cities</h1>
                <p>
                    Loading... This project runs on a free tier of Render, which
                    means that the server will spin down with inactivity. If
                    you're here for the first time, it'll take roughly a minute
                    to load.
                </p>
            </div>
        );
    }

    if (error) return "An error has occurred: " + error.message;

    // Component functions
    const getRandomCountryFromContinent = () => {
        if (!data) {
            return;
        }
        const objectKeys: string[] = Object.keys(data);
        let randomCountry: string =
            objectKeys[Math.floor(Math.random() * objectKeys.length)];
        // If the previous country is the same as the new country, get another new country.
        while (previousCountry.current === randomCountry) {
            console.log(
                `The previous country, ${previousCountry.current}, is the same as the next country, ${randomCountry}. Updating...`
            );
            randomCountry =
                objectKeys[Math.floor(Math.random() * objectKeys.length)];
        }
        setRandomCountryData({
            countryName: randomCountry,
            countryInfo: data[randomCountry],
        });
        previousCountry.current = randomCountry;
    };

    const handleRevealAnswer = () => {
        setShowAnswer(true);
        setShowNextQuestionButton(true);
    };

    const handleNextQuestion = () => {
        setShowAnswer(false);
        setShowNextQuestionButton(false);
        getRandomCountryFromContinent();
    };

    const handleUserContinentSelection = (
        continentName: ContinentName["name"]
    ) => {
        window.localStorage.setItem(
            "lastUserContinentSelection",
            continentName
        );
        setShowAnswer(false);
        setShowNextQuestionButton(false);
        setContinent(continentName);
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
                {randomCountryData?.countryInfo.definiteArticle ? "the " : null}
                {randomCountryData?.countryName}?
            </p>
            <button onClick={handleRevealAnswer}>Reveal answer</button>
            {showAnswer ? (
                <p>{randomCountryData?.countryInfo.capital}</p>
            ) : (
                <p></p>
            )}
            {showNextQuestionButton ? (
                <button onClick={handleNextQuestion}>Next question</button>
            ) : null}
        </div>
    );
};

export default Home;
