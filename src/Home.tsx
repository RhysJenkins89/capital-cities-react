import { useState, useRef, useContext, useEffect, RefObject } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { AppContext } from "./Context";
import getContinentData from "./fetchFunctions/getContinentData";
import updateCountryConfidenceIndex from "./fetchFunctions/updateCountryConfidenceIndex";
import SelectContinent from "./SelectContinent";
import UserLogin from "./UserLogin";
import UserSignup from "./UserSignup";
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

    // Get country data
    const { isPending, error, data } = useQuery({
        queryKey: [continent],
        queryFn: () => getContinentData(continent),
        staleTime: Infinity,
        gcTime: Infinity,
    });

    // useEffect
    useEffect(() => {
        if (!data) {
            return;
        }
        const randomCountry: CountryData = data[Math.floor(Math.random() * data.length)];
        setRandomCountryData(randomCountry);
    }, [data]);

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

        // // Update the database with the user's confidence index
        // // What does the route need to post to the database?
        // // the confidence index
        // // the country id

        // // Put function:
        // console.log("Update country confidence function");
        // // Send the id of the country
        // try {
        //     // This should be a useQuery method
        //     const response: Response = await fetch("http://localhost:3000/update", {
        //         method: "PUT",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify({ countryId: id }),
        //     });
        //     const resData = await response.json();
        //     console.log("Response:", resData);
        // } catch (error) {
        //     console.error("Error: ", error);
        // }

        // // TanStack Query

        // const { isPending, isError, isSuccess } = useMutation({
        //     mutationKey: ["testing"],
        //     // mutationFn: (newTodo) => {
        //     //     return axios.post("/todos", newTodo);
        //     // },
        //     mutationFn: () => updateCountryConfidenceIndex(userConfidence, id),
        // });
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
