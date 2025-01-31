import { useState } from "react";
import capitaliseFirstLetter from "./helperFunctions/capitaliseFirstLetter";

type ContinentData = {
    name: string;
};

const SelectContinent = ({ continentSelectionCallback, currentContinent }) => {
    const handleClick = (continent: ContinentData["name"]) => {
        continentSelectionCallback(continent);
    };

    return (
        <div>
            <div>
                <button
                    onClick={(event) =>
                        handleClick((event.target as HTMLInputElement).value)
                    }
                    value={"europe"}
                >
                    {/* event.target above is an HTMLElement, which doesn't necessarily have the property value. TypeScript detects this and throws the error. Casting event.target as an HTMLInputElement guarantees that the element contains the value property. */}
                    Europe
                </button>
                <button
                    onClick={(event) =>
                        handleClick((event.target as HTMLInputElement).value)
                    }
                    value={"asia"}
                >
                    Asia
                </button>
                <button
                    onClick={(event) =>
                        handleClick((event.target as HTMLInputElement).value)
                    }
                    value={"africa"}
                >
                    Africa
                </button>
            </div>
            <p>
                Current continent:{" "}
                <span>{capitaliseFirstLetter(currentContinent)}</span>
            </p>
        </div>
    );
};

export default SelectContinent;
