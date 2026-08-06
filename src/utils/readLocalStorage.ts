import continents from "../constants/continents";
import Continent from "../types/Continent";

function isContinent(localItem: string | null): localItem is Continent {
  // I need to understand the return type. And write down a explanation.
  // Moreover, what exactly does this return type mean? What does TypeScript see when the data is returned from this function.
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
