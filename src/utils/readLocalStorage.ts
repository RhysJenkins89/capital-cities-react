import continents from "../constants/continents";
import Continent from "../types/Continent";

function isContinent(localItem: string | null): localItem is Continent {
  const readOnlyContinents: ReadonlyArray<string> = continents;
  return localItem ? readOnlyContinents.includes(localItem) : false;
}

const readLocalStorage = (): Continent => {
  const localStorageValue = window.localStorage.getItem("lastUserContinentSelection");
  if (isContinent(localStorageValue)) {
    return localStorageValue;
  } else {
    return "europe";
  }
};

export default readLocalStorage;
