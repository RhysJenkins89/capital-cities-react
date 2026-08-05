const capitaliseFirstLetter = (input: string): string => {
  // return input.replace(input[0], input[0].toLocaleUpperCase());
  return input.charAt(0).toLocaleUpperCase() + input.slice(1);
};

export default capitaliseFirstLetter;
