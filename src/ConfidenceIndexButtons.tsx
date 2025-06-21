type ConfidenceIndexProps = {
    confidenceIndexCallback: (randomCountryId: string, confidenceIndex: number) => void;
    randomCountryId: string;
};

const handleConfidenceSelection = (
    event: React.MouseEvent<HTMLButtonElement>,
    randomCountryId: string,
    confidenceIndexCallback: (randomCountryId: string, confidenceIndex: number) => void
) => {
    const confidenceIndex: number = parseInt(event.currentTarget.value);
    confidenceIndexCallback(randomCountryId, confidenceIndex);
};

const ConfidenceIndexButtons = ({ confidenceIndexCallback, randomCountryId }: ConfidenceIndexProps) => {
    const confidenceIndexArray: number[] = [1, 2, 3, 4, 5];

    return confidenceIndexArray.map((index) => {
        return (
            <button
                key={index}
                onClick={(event) => handleConfidenceSelection(event, randomCountryId, confidenceIndexCallback)}
                value={index}
            >
                {index}
            </button>
        );
    });
};

export default ConfidenceIndexButtons;
