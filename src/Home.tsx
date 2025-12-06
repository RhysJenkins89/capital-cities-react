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
import { useAppContext } from "./customHooks/useAppContext";

// This is a test commit. Hello from my work laptop.

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
    const { userIsLoggedIn } = useAppContext();

    // useQuery
    const { isPending, error, data } = useQuery({
        // I should use the error variable here to handle errors. Funny that.
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

    const signOutMutation = useMutation({
        mutationKey: ["userSignOut"],
        mutationFn: userSignOut,
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

    const handleUserSignOut = () => {
        console.log("handleUserSignOut function");
        // I imagine here I need to call an endpoint in order to delete the cookie that I created on the backend.
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
                            {userIsLoggedIn ? (
                                <div>
                                    <br />
                                    <div>
                                        <button onClick={() => handleUserSignOut()}>Sign out</button>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                        {userIsLoggedIn ? (
                            <div>
                                <p>User logged in.</p>
                            </div>
                        ) : (
                            <div>
                                <p>User not logged in.</p>
                            </div>
                        )}
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
            {error ? <p>An error has occured.</p> : null}
        </div>
    );
};

export default Home;
