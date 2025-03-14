import { useState, FormEvent } from "react";

const UserSignup = () => {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleUserFormSubmit = async (event: FormEvent) => {
        event.preventDefault();

        try {
            const response: Response = await fetch(
                "http://localhost:3000/signup",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        firstName,
                        lastName,
                        email,
                        password,
                    }),
                }
            );

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result);
            } else {
                console.log("User successfully created.");
            }
        } catch (error) {
            console.log("An error occured.");
            console.log("Error:", error);
        }

        // Reset form states
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
    };

    return (
        <form onSubmit={handleUserFormSubmit}>
            <div>
                <label>
                    First name:
                    <input
                        type="text"
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    Last name:
                    <input
                        type="text"
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                    />
                </label>
            </div>
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

export default UserSignup;
