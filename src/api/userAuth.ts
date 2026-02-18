const API_URL = import.meta.env.VITE_API_URL;

const userAuth = async () => {
    try {
        const response: Response = await fetch(`${API_URL}/auth`, {
            credentials: "include",
        });
        if (!response.ok) {
            const body = await response.json();
            console.log("Response not okay:", body);
        } else {
            const data = await response.json();
            console.log("data:", data);
            return data;
        }
    } catch (error) {
        console.error("error:", error);
    }
};

export default userAuth;
