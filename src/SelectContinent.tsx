import { Dispatch, SetStateAction } from "react";
import capitaliseFirstLetter from "./helperFunctions/capitaliseFirstLetter";
import ContinentName from "./types/ContinentName";

type SelectContinentProps = {
    continentSelectionCallback: Dispatch<SetStateAction<string>>;
    currentContinent: string;
};

const SelectContinent = ({
    continentSelectionCallback,
    currentContinent,
}: SelectContinentProps) => {
    const continents: string[] = [
        "europe",
        "asia",
        "oceania",
        "north-america",
        "south-america",
        "africa",
    ];

    const handleClick = (continent: ContinentName["name"]) => {
        continentSelectionCallback(continent);
    };

    return (
        <div>
            <div>
                {continents.map((continent) => {
                    return (
                        <button
                            key={continent}
                            onClick={(event) =>
                                handleClick(
                                    (event.target as HTMLInputElement).value
                                )
                            }
                            value={continent}
                        >
                            {capitaliseFirstLetter(continent)}
                        </button>
                    );
                })}
            </div>
            <p>
                Current continent:{" "}
                <span>{capitaliseFirstLetter(currentContinent)}</span>
            </p>
        </div>
    );
};

export default SelectContinent;
