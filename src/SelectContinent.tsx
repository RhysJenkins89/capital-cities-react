import { useState } from "react";

const SelectContinent = ({ sendDataToParent }) => {
    const [userContinentSelection, setUserContinentSelection] = useState("");

    const handleClick = () => {
        sendDataToParent(userContinentSelection);
    };

    return (
        <div>
            <select
                value={userContinentSelection}
                onChange={(event) =>
                    setUserContinentSelection(event.target.value)
                }
            >
                <option value="europe">Europe</option>
                <option value="asia">Asia</option>
            </select>
            <button onClick={handleClick}>Send data to parent</button>
        </div>
    );
};

export default SelectContinent;
