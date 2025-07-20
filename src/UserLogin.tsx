const API_URL = import.meta.env.VITE_API_URL;
import { useState, FormEvent, useContext } from "react";
import { useForm } from "react-hook-form";
import { AppContext } from "./Context";

const UserLogin: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleUserLogin = async (event: FormEvent) => {
        event.preventDefault();
        try {
            const response: Response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const userData = await response.json();
            if (!response.ok) {
                throw new Error(userData.error);
            } else {
                setUserIsLoggedIn(true);
                console.log("userData:", userData);
                localStorage.setItem("token", userData.token);
                console.log("Successfully logged in. Here is the token:", userData.token);
            }
            // If the user successfully logs in, I need to show it somehow. However, this state should probably live in the Home component
            // For now, show the text 'You have logged in.'
            // Show a signout button
            // I also need signout functionaltity
        } catch (error) {
            console.log("An error occured.");
            console.log("Error:", error);
        }

        // These two might cause a problem
        setEmail("");
        setPassword("");
    };

    const context = useContext(AppContext);

    if (!context) {
        throw new Error("Use this component inside of the AppContextProvider component.");
    }

    const { setUserIsLoggedIn } = context;

    // const {
    //     register,
    //     handleSubmit,
    //     reset,
    //     formState: { errors },
    // } = useForm<IFormInput>();

    return (
        <div>
            <form onSubmit={handleUserLogin}>
                {/* <div>
                    <label>
                        Email:
                        <input
                            {...register("email", {
                                required: "Email enter your email.",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Please enter a valid email address.",
                                },
                            })}
                        />
                        {errors.email && <p>{errors.email.message}</p>}
                    </label>
                </div> */}

                <div>
                    <label>
                        Email:
                        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        Password:
                        <input type="test" value={password} onChange={(event) => setPassword(event.target.value)} />
                    </label>
                </div>
                <input type="submit" />
            </form>
        </div>
    );
};

export default UserLogin;
