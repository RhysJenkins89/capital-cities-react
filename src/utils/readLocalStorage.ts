import Continent from "../types/Continent";
import isContinent from "./isContinent";

const readLocalStorage = (): Continent => {
  const localStorageValue = window.localStorage.getItem("lastUserContinentSelection");
  if (isContinent(localStorageValue)) {
    return localStorageValue;
  } else {
    return "europe";
  }
};

export default readLocalStorage;
