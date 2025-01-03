const getEuropeData = async () => {
    const data = await fetch("./data/europe.json");
    const europeData = await data.json();
    return europeData;
};

export default getEuropeData;
