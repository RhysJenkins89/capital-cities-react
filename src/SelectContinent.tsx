import { useState } from "react";
import capitaliseFirstLetter from "./helperFunctions/capitaliseFirstLetter";

const SelectContinent = ({ sendDataToParent, currentContinent }) => {
    const handleClick = (continent: string) => {
        sendDataToParent(continent);
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
