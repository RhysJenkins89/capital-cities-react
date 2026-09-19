const API_URL = import.meta.env.VITE_API_URL;

const EmailTest = () => {
  const handleButtonClick = async () => {
    console.log("handle button click");
    const response: Response = await fetch(`http://localhost:8080`);
    const data = await response.json();
    console.log("data:", data);
  };

  // Understand the following error:
  // Access to fetch at 'http://localhost:8080/' from origin 'http://localhost:5173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.

  // Also, I need a method for sorting out these thoughts that come into my mind as I'm building. It might be a Newportian-style working-memory.txt file.

  // This looks like a useful resource: https://www.stackhawk.com/blog/golang-cors-guide-what-it-is-and-how-to-enable-it/.

  return (
    <div>
      <p>This is the EmailTest component.</p>
      <button onClick={handleButtonClick}>Email test</button>
    </div>
  );
};

export default EmailTest;
