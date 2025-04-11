import { useState, useRef, useContext, useEffect } from "react";
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
    const [showNextQuestionButton, setShowNextQuestionButton] = useState<boolean>(false);
    const [continent, setContinent] = useState<string>(window.localStorage.getItem("lastUserContinentSelection") || "europe");
    const [showLogin, setShowLogin] = useState<boolean>(false);
    const [showSignup, setShowSignup] = useState<boolean>(false);
    const [randomCountryData, setRandomCountryData] = useState<CountryData | null>(null)

    // App context
    const context = useContext(AppContext);

    if (!context) {
        throw new Error(
            "Use this component inside of the AppContextProvider component."
        );
    }

    const { userIsLoggedIn } = context;

    // Get country data
    // I make this request every time the app rerenders. That ain't good.
    // In fact, it's worse. I don't use the built-in caching in useQuery because I use this fetch to get a specific country, not the continent data, so the data is almost always going to be different.
    const { isPending, error, data, refetch } = useQuery({
        queryKey: [continent],
        queryFn: () => getContinentData(continent),
        staleTime: Infinity,
        gcTime: Infinity
    });

    if (isPending)
        return "Loading... This project runs on a free tier of Render, which means that the server will spin down with inactivity. If you're here for the first time, it'll take roughly a minute to load.";

    if (error) return "An error has occurred: " + error.message;

    // Component functions
    const getRandomCountryFromContinent = () => {
        if (!data) {
            return;
        }
        const objectKeys: string[] = Object.keys(data);
        const randomCountry: string = objectKeys[Math.floor(Math.random() * objectKeys.length)]
        setRandomCountryData({
            countryName: randomCountry,
            countryInfo: data[randomCountry]
        }) 
    }

    // const getInitialRandomCountry = (): CountryData | null => {
    //     if (!data) {
    //         return null;
    //     }
    //     const objectKeys: string[] = Object.keys(data);
    //     const randomCountry: string = objectKeys[Math.floor(Math.random() * objectKeys.length)]
    //     return {
    //         countryName: randomCountry,
    //         countryInfo: data[randomCountry]
    //     }
    // }

    useEffect(() => {
        if (!data) return;
        const objectKeys: string[] = Object.keys(data);
        const randomCountry: string = objectKeys[Math.floor(Math.random() * objectKeys.length)]
        setRandomCountryData({
            countryName: randomCountry,
            countryInfo: data[randomCountry]
        })
    }, [data])

    const handleRevealAnswer = () => {
        setShowAnswer(true);
        setShowNextQuestionButton(true);
    };

    const handleNextQuestion = () => {
        setShowAnswer(false);
        setShowNextQuestionButton(false);
        refetch();
    };

    const handleUserContinentSelection = (continentData: ContinentName["name"]) => {
        window.localStorage.setItem("lastUserContinentSelection", continentData);
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
                {randomCountryData?.countryInfo.definiteArticle ? "the " : null}
                {randomCountryData?.countryName}?
            </p>
            <button onClick={handleRevealAnswer}>Reveal answer</button>
            {showAnswer ? <p>{randomCountryData?.countryInfo.capital}</p> : <p></p>}
            {showNextQuestionButton ? (
                <button onClick={handleNextQuestion}>Next question</button>
            ) : null}
        </div>
    );
};

export default Home;

// This is the logic to get a random country: 

// const objectKeys: string[] = Object.keys(continentData);
// const randomCountry: string =
//     objectKeys[Math.floor(Math.random() * objectKeys.length)];
// return {
//     countryName: randomCountry,
//     countryInfo: continentData[randomCountry],
// };

// Write why you are refactoring the code. It'll be practice and it might prove useful in an interview situation. 
