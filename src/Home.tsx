import { useState, useRef, FormEvent } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
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
    const [userFirstName, setUserFirstName] = useState<string>("");
    const [userLastName, setUserLastName] = useState<string>("");
    const [userEmail, setUserEmail] = useState<string>("");
    const [userPassword, setUserPassword] = useState<string>("");
    const previousCountry = useRef<string>("");

    const { isPending, error, data, refetch } = useQuery({
        queryKey: [continent],
        queryFn: () => getRandomCountryData(continent),
    });

    if (isPending)
        return "Loading... This project runs on a free tier of Render, which means that the server will spin down with inactivity. If you're here for the first time, it'll take roughly a minute to load.";

    if (error) return "An error has occurred: " + error.message;

    // console.log("useRef previous country:", previousCountry.current);

    // if previousCountry.current is an empty string, continue with the render as normal.
    // if (previousCountry.current === data.countryName) {
    // debugger;
    // console.log(
    // `The previous country, ${previousCountry.current}, is the same as the current country, ${data.countryName}.`
    // );
    // console.log("Refetching data.");
    // refetch();
    // }

    const handleRevealAnswer = () => {
        // console.log("current data:", data);
        setShowAnswer(true);
        setShowNextQuestionButton(true);
    };

    // I reckon that the problem is because of the rerender cycle -- or something like that. React does something interesting when it comes to rerenders using multiple useState calls. The the page reloads, the data hasn't refreshed to bring in a new country, which is why I get the .log stating that the previous country is the same as the current country.
    const handleNextQuestion = () => {
        // debugger;
        // previousCountry.current = data.countryName; // This is the right place to update the logic. I mean, maybe. Who knows really?
        // debugger;
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

    const handleUserFormSubmit = async (event: FormEvent) => {
        event.preventDefault();
        // console.log("user clicked submit");
        // console.log("User first name: ", userFirstName);
        // console.log("User last name: ", userLastName);
        // console.log("User email: ", userEmail);
        // console.log("User password: ", userPassword);
        // console.log("Form event:", event);
        // setUserFirstName("");
        // setUserLastName("");
        // setUserEmail("");
        // setUserPassword("");
        // Here I probably want to include the useQuery hook
        // The function that I pass to the hook will be a post request
        // I'll need to pass the form data to the useQuery request

        // const response: Response = await fetch(
        //     // "https://cities-api.rhysjenkins.uk/signup",
        //     "http://localhost:3000/signup",
        //     {
        //         method: "POST",
        //         body: JSON.stringify({ test: "example" }),
        //     }
        // );

        // if (response.status === 200) {
        //     console.log("Response okay:", JSON.stringify(response.body));
        // }

        // useMutation
        // const mutation = useMutation({
        //     mutationFn: () => {
        //         return fetch("api-route-here", {
        //             method: "POST",
        //             body: "Test message",
        //         });
        //     },
        // });

        // mutation.mutate({})

        // onClick={() => {
        //     mutation.mutate({ id: new Date(), title: 'Do Laundry' })
        // }}
    };

    return (
        <div>
            <h1>Capital cities</h1>
            {/* <button onClick={handleUserLogin}>Login</button> */}
            {/* <form onSubmit={handleUserFormSubmit}>
                <div>
                    <label>
                        First name:
                        <input
                            type="text"
                            value={userFirstName}
                            onChange={(event) =>
                                setUserFirstName(event.target.value)
                            }
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Last name:
                        <input
                            type="text"
                            value={userLastName}
                            onChange={(event) =>
                                setUserLastName(event.target.value)
                            }
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Email:
                        <input
                            type="email"
                            value={userEmail}
                            onChange={(event) =>
                                setUserEmail(event.target.value)
                            }
                        />
                    </label>
                </div>
                <div>
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
                </div>
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
