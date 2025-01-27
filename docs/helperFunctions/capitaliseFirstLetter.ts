const capitaliseFirstLetter = (input: string): string => {
    return input.replace(input[0], input[0].toLocaleUpperCase());
};

export default capitaliseFirstLetter;
