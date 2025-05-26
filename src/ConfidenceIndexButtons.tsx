type ConfidenceIndexProps = {
    randomCountryId: string;
};

const handleConfidenceSelection = (event: React.MouseEvent<HTMLButtonElement>, randomCountryId: string) => {
    console.log("Event: ", event.currentTarget.value);
    console.log("Random country id: ", randomCountryId);
    // I would call the update route from here.
};

const ConfidenceIndexButtons = ({ randomCountryId }: ConfidenceIndexProps) => {
    const confidenceIndex: number[] = [1, 2, 3, 4, 5];

    return confidenceIndex.map((index) => {
        return (
            <button key={index} onClick={(event) => handleConfidenceSelection(event, randomCountryId)} value={index}>
                {index}
            </button>
        );
    });
};

export default ConfidenceIndexButtons;
