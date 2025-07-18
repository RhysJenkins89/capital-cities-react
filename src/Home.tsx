import { useState, useRef, useContext, useEffect, RefObject } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { AppContext } from "./Context";
import { useNavigate } from "react-router";
import getContinentData from "./fetchFunctions/getContinentData";
import updateCountryConfidenceIndex from "./fetchFunctions/updateCountryConfidenceIndex";
import SelectContinent from "./SelectContinent";
import UserLogin from "./UserLogin";
import UserSignup from "./UserRegister";
import ContinentName from "./types/ContinentName";
import CountryData from "./types/CountryData";
import ConfidenceIndexButtons from "./ConfidenceIndexButtons";

const Home: React.FC = () => {
    const [showAnswer, setShowAnswer] = useState<boolean>(false);
    const [continent, setContinent] = useState<string>(
        window.localStorage.getItem("lastUserContinentSelection") || "europe"
    );
    const [showLogin, setShowLogin] = useState<boolean>(false);
    const [showSignup, setShowSignup] = useState<boolean>(false);
    const [randomCountryData, setRandomCountryData] = useState<CountryData | null>(null);
    const [showConfidenceSelection, setShowConfidenceSelection] = useState<boolean>(false);
    const previousCountry: RefObject<string> = useRef<string>("");

    // App context
    const context = useContext(AppContext);

    if (!context) {
        throw new Error("Use this component inside of the AppContextProvider component.");
    }

    const { userIsLoggedIn } = context;

    // useQuery
    const { isPending, error, data } = useQuery({
        queryKey: [continent],
        queryFn: () => getContinentData(continent),
        staleTime: Infinity,
        gcTime: Infinity,
    });

    // useMutation
    const mutation = useMutation({
        mutationKey: ["updateConfidenceIndex"],
        mutationFn: updateCountryConfidenceIndex,
    });

    // useEffect
    useEffect(() => {
        if (!data) {
            return;
        }
        const randomCountry: CountryData = data[Math.floor(Math.random() * data.length)];
        setRandomCountryData(randomCountry);
    }, [data]);

    // useNavigate
    const navigate = useNavigate();

    // Component functions
    const getRandomCountryFromContinent = () => {
        if (!data) {
            return;
        }
        let randomCountry: CountryData = data[Math.floor(Math.random() * data.length)];
        while (previousCountry.current === randomCountry.name) {
            randomCountry = data[Math.floor(Math.random() * data.length)];
        }
        setRandomCountryData(randomCountry);
        previousCountry.current = randomCountry.name;
    };

    const handleRevealAnswer = () => {
        setShowAnswer(true);
        setShowConfidenceSelection(true);
    };

    const handleConfidenceSelection = async (id: string, confidenceIndex: number) => {
        setShowAnswer(false);
        setShowConfidenceSelection(false);
        getRandomCountryFromContinent();
        mutation.mutate({ countryId: id, userConfidence: confidenceIndex });
    };

    const handleUserContinentSelection = (continentName: ContinentName["name"]) => {
        window.localStorage.setItem("lastUserContinentSelection", continentName);
        setShowAnswer(false);
        setContinent(continentName);
    };

    return (
        <div>
            <h1>Capital cities</h1>
            {isPending ? (
                <p>Loading country data.</p>
            ) : (
                randomCountryData && (
                    <div>
                        <div>
                            <div>
                                <button onClick={() => navigate("/register")}>Register</button>
                            </div>
                            <br />
                            <div>
                                <button onClick={() => navigate("/signin")}>Sign in</button>
                            </div>
                        </div>
                        <p>Select continent:</p>
                        <SelectContinent
                            continentSelectionCallback={handleUserContinentSelection}
                            currentContinent={continent}
                        />
                        <p>
                            What is the capital of {randomCountryData.definiteArticle ? "the " : null}
                            {randomCountryData.name}?
                        </p>
                        <button onClick={handleRevealAnswer}>Reveal answer</button>
                        {showAnswer ? <p>{randomCountryData.capital}</p> : <p></p>}
                        {showConfidenceSelection ? (
                            <div>
                                <p>How well do you know this?</p>
                                <div>
                                    <ConfidenceIndexButtons
                                        randomCountryId={randomCountryData._id}
                                        confidenceIndexCallback={handleConfidenceSelection}
                                    />
                                </div>
                                <p>
                                    Note that this selection does not yet have any effect on the frequency of recurring
                                    items.
                                </p>
                            </div>
                        ) : null}
                    </div>
                )
            )}
        </div>
    );
};

export default Home;

// Write about:
// The fetch request issue
// The useEffect/hooks bug
// chatGPT thinks that React.MutableRefObject is the correct type for a useRef object, but VS Code tells me that it's been deprecated
