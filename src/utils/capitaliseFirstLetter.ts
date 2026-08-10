const capitaliseFirstLetter = (input: string): string => {
  return input.charAt(0).toLocaleUpperCase() + input.slice(1);
};

export default capitaliseFirstLetter;
