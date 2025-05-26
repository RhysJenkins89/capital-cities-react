import CountryData from "./types/CountryData";

const ConfidenceIndexButtons: React.FC = (randomCountryData: CountryData) => {
    const confidenceIndex: number[] = [1, 2, 3, 4, 5];

    return confidenceIndex.map((index) => {
        return (
            <button
                key={index}
                onClick={(event) => handleConfidenceSelection(event, randomCountryData._id)}
                value={index}
            >
                {index}
            </button>
        );
    });
};

export default ConfidenceIndexButtons;
