import capitaliseFirstLetter from "./helperFunctions/capitaliseFirstLetter";
import ContinentName from "./types/ContinentName";

type SelectContinentProps = {
    continentSelectionCallback: (input: string) => void;
    currentContinent: string;
};

const SelectContinent = ({ continentSelectionCallback, currentContinent }: SelectContinentProps) => {
    const continents: string[] = ["europe", "asia", "oceania", "north-america", "south-america", "africa"];

    const handleClick = (continent: ContinentName["name"]) => {
        continentSelectionCallback(continent);
    };

    const renderContinentText = (text: string): string => {
        if (text === "north-america") return "North America";
        if (text === "south-america") return "South America";
        return capitaliseFirstLetter(text);
    };

    return (
        <div>
            <div>
                {continents.map((continent) => {
                    return (
                        <button
                            key={continent}
                            onClick={(event) => handleClick((event.target as HTMLInputElement).value)}
                            value={continent}
                        >
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
