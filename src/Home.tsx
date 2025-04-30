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
    const [showConfidenceSelection, setShowConfidenceSelection] =
        useState<boolean>(false);
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

    useEffect(() => {
        if (!data) {
            return;
        }
        const randomCountry: CountryData =
            data[Math.floor(Math.random() * data.length)];
        setRandomCountryData(randomCountry);
    }, [data]);

    // Component functions
    const getRandomCountryFromContinent = () => {
        if (!data) {
            return;
        }
        let randomCountry: CountryData =
            data[Math.floor(Math.random() * data.length)];
        while (previousCountry.current === randomCountry.name) {
            // If the previous country is the same as the new country, get another new country.
            randomCountry = data[Math.floor(Math.random() * data.length)];
        }
        setRandomCountryData(randomCountry);
        previousCountry.current = randomCountry.name;
    };

    const handleRevealAnswer = () => {
        setShowAnswer(true);
        setShowConfidenceSelection(true);
        setShowNextQuestionButton(true);
    };

    const handleConfidenceSelection = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        const userConfidence: number = parseInt(event.currentTarget.value);
        setShowAnswer(false);
        setShowConfidenceSelection(false);
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
            {isPending ? (
                <p>Loading country data.</p>
            ) : (
                <div>
                    <p>Select continent:</p>
                    <SelectContinent
                        continentSelectionCallback={
                            handleUserContinentSelection
                        }
                        currentContinent={continent}
                    />
                    <p>
                        What is the capital of{" "}
                        {randomCountryData?.definiteArticle ? "the " : null}
                        {randomCountryData?.name}?
                    </p>
                    <button onClick={handleRevealAnswer}>Reveal answer</button>
                    {showAnswer ? <p>{randomCountryData?.capital}</p> : <p></p>}
                    {showConfidenceSelection ? (
                        <div>
                            <div>
                                <p>How well do you know this?</p>
                                <div>
                                    <button
                                        onClick={handleConfidenceSelection}
                                        value={1}
                                    >
                                        1
                                    </button>
                                    <button
                                        onClick={handleConfidenceSelection}
                                        value={2}
                                    >
                                        2
                                    </button>
                                    <button
                                        onClick={handleConfidenceSelection}
                                        value={3}
                                    >
                                        3
                                    </button>
                                    <button
                                        onClick={handleConfidenceSelection}
                                        value={4}
                                    >
                                        4
                                    </button>
                                    <button
                                        onClick={handleConfidenceSelection}
                                        value={5}
                                    >
                                        5
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
            )}
        </div>
    );
};

export default Home;

// Write about:
// The fetch request issue
// The useEffect/hooks bug
// chatGPT thinks that React.MutableRefObject is the correct type for a useRef object, but VS Code tells me that it's been deprecated
