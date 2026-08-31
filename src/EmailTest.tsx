const API_URL = import.meta.env.VITE_API_URL;

const EmailTest = () => {
  const handleButtonClick = async () => {
    console.log("handle button click");
    const response: Response = await fetch(`${API_URL}/email`);
    const data = await response.json();
    console.log("data:", data);
  };

  return (
    <div>
      <p>This is the EmailTest component.</p>
      <button onClick={handleButtonClick}>Email test</button>
    </div>
  );
};

export default EmailTest;
