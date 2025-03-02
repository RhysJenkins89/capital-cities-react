import { useState, useRef, FormEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import getRandomCountryData from "./fetchFunctions/getRandomCountryData";
import SelectContinent from "./SelectContinent";

// Add login functionality and an account page

const Home = () => {
    const [showAnswer, setShowAnswer] = useState<boolean>(false);
    const [showNextQuestionButton, setShowNextQuestionButton] =
        useState<boolean>(false);
    const [continent, setContinent] = useState<string>(
        window.localStorage.getItem("lastUserContinentSelection") || "europe"
    );
    const [userEmail, setUserEmail] = useState<string>("");
    const [userPassword, setUserPassword] = useState<string>("");
    const previousCountry = useRef<string>("");

    const { isPending, error, data, refetch } = useQuery({
        queryKey: [continent],
        queryFn: () => getRandomCountryData(continent),
    });

    if (isPending) return "Loading...";

    if (error) return "An error has occurred: " + error.message;

    console.log("useRef previous country:", previousCountry.current);

    // if previousCountry.current is an empty string, continue with the render as normal.
    if (previousCountry.current === data.countryName) {
        debugger;
        console.log(
            `The previous country, ${previousCountry.current}, is the same as the current country, ${data.countryName}.`
        );
        // console.log("Refetching data.");
        // refetch();
    }

    const handleRevealAnswer = () => {
        // console.log("current data:", data);
        setShowAnswer(true);
        setShowNextQuestionButton(true);
    };

    // I reckon that the problem is because of the rerender cycle -- or something like that. React does something interesting when it comes to rerenders using multiple useState calls. The the page reloads, the data hasn't refreshed to bring in a new country, which is why I get the .log stating that the previous country is the same as the current country.
    const handleNextQuestion = () => {
        // debugger;
        previousCountry.current = data.countryName; // This is the right place to update the logic. I mean, maybe. Who knows really?
        setShowAnswer(false);
        setShowNextQuestionButton(false);
        refetch();
    };

    type ContinentName = {
        name: string;
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

    const handleUserLogin = () => {
        console.log("user clicked login");

        // Show a signup form -- email and password will do for now
        // On submit, send a request to the backend
        // Build a route on the backend to accept the request
    };

    const handleUserFormSubmit = (event: FormEvent) => {
        // Changing Event to FormEvent event fixed the error.
        event.preventDefault();
        console.log("user clicked submit");
    };

    return (
        <div>
            <h1>Capital cities</h1>
            {/* <button onClick={handleUserLogin}>Login</button>
            <form onSubmit={handleUserFormSubmit}>
                <label>
                    Email:
                    <input
                        type="email"
                        value={userEmail}
                        onChange={(event) => setUserEmail(event.target.value)}
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        value={userPassword}
                        onChange={(event) =>
                            setUserPassword(event.target.value)
                        }
                    />
                </label>
                <input type="submit" />
            </form> */}
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
