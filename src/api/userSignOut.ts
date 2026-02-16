const API_URL = import.meta.env.VITE_API_URL;

const userSignOut = async (email: string) => {
    try {
        const response: Response = await fetch(`${API_URL}/signout`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userEmail: email }),
        });
        console.log("response from userSignOut.ts:", response);
    } catch (error) {
        console.error("Error:", error);
    }
};

export default userSignOut;

// const loginUser = async ({ email, password }: PropTypes) => {
//     try {
//         const response: Response = await fetch(`${API_URL}/signin`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ email, password }),
//         });
//         if (!response.ok) {
//             const body = await response.json();
//             console.log("Response not okay:", body);
//         } else {
//             const userData = await response.json();
//             // console.log("userData:", userData);
//             return userData;
//         }
//     } catch (error) {
//         console.error("error:", error);
//     }
// };

// export default loginUser;
