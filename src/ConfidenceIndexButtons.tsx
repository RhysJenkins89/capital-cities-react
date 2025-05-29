type ConfidenceIndexProps = {
    confidenceIndexCallback: (input: string) => void;
    randomCountryId: string;
};

const handleConfidenceSelection = (
    event: React.MouseEvent<HTMLButtonElement>,
    randomCountryId: string,
    confidenceIndexCallback: (id: string) => void
) => {
    console.log("Event: ", event.currentTarget.value);
    console.log("Random country id: ", randomCountryId);
    // I would call the update route from here.
    confidenceIndexCallback(randomCountryId);
};

const ConfidenceIndexButtons = ({ confidenceIndexCallback, randomCountryId }: ConfidenceIndexProps) => {
    const confidenceIndex: number[] = [1, 2, 3, 4, 5];

    return confidenceIndex.map((index) => {
        return (
            <button
                key={index}
                onClick={(event) => handleConfidenceSelection(event, randomCountryId, confidenceIndexCallback)}
                value={index}
            >
                {index}
            </button>
            // <button key={index} onClick={(event) => confidenceIndexCallback(randomCountryId)} value={index}>
            //     {index}
            // </button>
        );
    });
};

export default ConfidenceIndexButtons;
