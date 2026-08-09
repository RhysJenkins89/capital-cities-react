import Continent from "../types/Continent";
import continents from "../constants/continents";

function isContinent(localItem: string | null): localItem is Continent {
  // I need to understand the return type. And write down a explanation.
  // Moreover, what exactly does this return type mean? What does TypeScript see when the data is returned from this function.
  const readOnlyContinents: ReadonlyArray<string> = continents;
  return localItem ? readOnlyContinents.includes(localItem) : false;
}

export default isContinent;
