const capitaliseFirstLetter = (input: string): string => {
    // if (input.length === 0) {
    //     return; // This function must return a string, but what happens if I pass an empty string into it?
    // }
    return input.replace(input[0], input[0].toLocaleUpperCase());
};

export default capitaliseFirstLetter;
