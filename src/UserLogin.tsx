import { useState, FormEvent } from "react";

const UserLogin = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleUserLogin = async (event: FormEvent) => {
        event.preventDefault();
        try {
            const response: Response = await fetch(
                "http://localhost:3000/login",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                }
            );

            const userData = await response.json();
            if (!response.ok) {
                throw new Error(userData.error);
            }
            localStorage.setItem("token", userData.token);
            console.log(
                "Successfully logged in. Here is the token:",
                userData.token
            );
        } catch (error) {
            console.log("An error occured.");
            console.log("Error:", error);
        }

        // These two might cause a problem
        setEmail("");
        setPassword("");
    };

    return (
        <form onSubmit={handleUserLogin}>
            <div>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </label>
            </div>
            <input type="submit" />
        </form>
    );
};

export default UserLogin;
