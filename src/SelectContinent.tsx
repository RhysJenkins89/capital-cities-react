import Continent from "./types/Continent";
import continents from "./constants/continents";
import isContinent from "./utils/isContinent";
import capitaliseFirstLetter from "./utils/capitaliseFirstLetter";

type SelectContinentProps = {
  continentSelectionCallback: (input: Continent) => void;
  currentContinent: Continent;
};

const SelectContinent = ({ continentSelectionCallback, currentContinent }: SelectContinentProps) => {
  const handleClick = (continent: Continent) => {
    continentSelectionCallback(continent);
  };

  const renderContinentText = (text: Continent): string => {
    if (text === "north-america") return "North America";
    if (text === "south-america") return "South America";
    return capitaliseFirstLetter(text);
  };

  // You can define handleclick as an arrow function stored in a const variable. Closures should take care of this for you then as const does not get hoisted unlike a function.

  // Simply changing function handleClick() { to const handleClick = () => should do the trick.

  // I need:
  //    - change cities-api.rhysjenkins.uk to cities.rhysjenkins.uk/api
  //    - a staging build
  //    - a dev database
  //    - pipelines
  //    - to look into basic project management
  //    - to look into deploying this app myself

  return (
    <div>
      <div>
        {continents.map((continent) => {
          return (
            <button
              key={continent}
              onClick={(event) => {
                handleClick((event.target as HTMLInputElement).value);
              }}
              // handleClick((event.target as HTMLInputElement).value)}
              // This is the problem: the value property on the HTMLInputElement type is a string. TypeScript doesn't know
              // that the string will be one of the continents. All TypeScript knows is that it will be a string.
              value={continent}
            >
              {/* event.target as HTMLInputElement).value */}
              {renderContinentText(continent)}
            </button>
          );
        })}
      </div>
      <p>
        Current continent: <span>{renderContinentText(currentContinent)}</span>
      </p>
    </div>
  );
};

export default SelectContinent;
