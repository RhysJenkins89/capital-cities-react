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
    const handleClick = (continent: ContinentName["name"]) => {
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
