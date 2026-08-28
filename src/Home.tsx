import { useState, useRef, useContext, useEffect, RefObject } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { AppContext } from "./Context";
import { useNavigate } from "react-router";
import getContinentData from "./api/getContinentData";
import updateCountryConfidenceIndex from "./api/updateCountryConfidenceIndex";
import userSignOut from "./api/userSignOut";
import userAuth from "./api/userAuth";
import SelectContinent from "./SelectContinent";
// import UserLogin from "./UserLogin";
// import UserSignup from "./UserRegister";
import CountryData from "./types/CountryData";
import Continent from "./types/Continent";
import continents from "./constants/continents";
import ConfidenceIndexButtons from "./ConfidenceIndexButtons";
import { useAppContext } from "./customHooks/useAppContext";
import readLocalStorage from "./utils/readLocalStorage";

const API_URL = import.meta.env.VITE_API_URL;

const Home: React.FC = () => {
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [continent, setContinent] = useState<Continent>(readLocalStorage());
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showSignup, setShowSignup] = useState<boolean>(false);
  const [randomCountryData, setRandomCountryData] = useState<CountryData | null>(null);
  // const [showConfidenceSelection, setShowConfidenceSelection] = useState<boolean>(false);
  const previousCountry: RefObject<string> = useRef<string>("");

  console.log("continent from the main body of the component:");
  console.log(continent);

  // App context
  const { userIsLoggedIn, userData } = useAppContext();

  // useQuery
  const { isPending, error, data } = useQuery({
    // I should use the error variable here to handle errors. Funny that.
    queryKey: ["getContinentData", continent],
    queryFn: () => getContinentData(continent),
    staleTime: Infinity,
    gcTime: Infinity,
  });

  // How does useQuery know that the data has been updated and should, therefore, call the API again.
  // The useQuery function doesn't know that the data variable has changed.

  console.log("useQuery data:");
  console.log(data);

  // const { data: userAuthData } = useQuery({
  //   queryKey: ["getUserAuth"],
  //   queryFn: () => userAuth(),
  // });

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
    console.log("useEffect in Home.tsx");
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
    // setShowConfidenceSelection(true);
  };

  const handleNextCountry = () => {
    setShowAnswer(false);
    getRandomCountryFromContinent();
  };

  // const handleConfidenceSelection = async (id: string, confidenceIndex: number) => {
  //   setShowAnswer(false);
  //   setShowConfidenceSelection(false);
  //   getRandomCountryFromContinent();
  //   mutation.mutate({ countryId: id, userConfidence: confidenceIndex });
  // };

  const handleUserContinentSelection = (continent: Continent) => {
    // console.log("handleUserContinentSelection from Home.tsx");
    window.localStorage.setItem("lastUserContinentSelection", continent);
    setShowAnswer(false);
    console.log("continent in handleUserContinentSelection:");
    console.log(continent);
    setContinent(continent);
    // debugger;
  };

  const handleUserSignOut = () => {
    console.log("handleUserSignOut function");
    signOutMutation.mutate(userData.email);
  };

  return (
    <div>
      <h1>Capital cities</h1>
      {isPending ? (
        <p>Loading country data.</p>
      ) : (
        randomCountryData && (
          <div>
            {/* <div>
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
            )} */}
            {/* {userData.firstName && ( 
              <div>
                <p>User data:</p>
                <p>{userData.firstName}</p>
                <p>{userData.lastName}</p>
                <p>{userData.email}</p>
              </div>
            )} */}
            <p>Select continent:</p>
            <SelectContinent continentSelectionCallback={handleUserContinentSelection} currentContinent={continent} />
            <p>
              What is the capital of {randomCountryData.definiteArticle ? "the " : null}
              {randomCountryData.name}?
            </p>
            <button onClick={handleRevealAnswer}>Reveal answer</button>
            {showAnswer ? (
              <>
                <p>{randomCountryData.capital}</p>
                <button onClick={handleNextCountry}>Next country</button>
              </>
            ) : null}

            {/* {showConfidenceSelection ? (
              <div>
                <p>How well do you know this?</p>
                <div>
                  <ConfidenceIndexButtons
                    randomCountryId={randomCountryData._id}
                    confidenceIndexCallback={handleConfidenceSelection}
                  />
                </div>
                <p>Note that this selection does not yet have any effect on the frequency of recurring items.</p>
              </div>
            ) : null} */}
          </div>
        )
      )}
      {error ? <p>An error has occured.</p> : null}
    </div>
  );
};

export default Home;
