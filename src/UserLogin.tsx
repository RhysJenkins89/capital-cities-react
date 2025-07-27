const API_URL = import.meta.env.VITE_API_URL;
import { useState, FormEvent, useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AppContext } from "./Context";

const UserLogin: React.FC = () => {
    // const handleUserLogin = async (event: FormEvent) => {
    //     event.preventDefault();
    //     try {
    //         const response: Response = await fetch(`${API_URL}/login`, {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({ email, password }),
    //         });

    //         const userData = await response.json();
    //         if (!response.ok) {
    //             throw new Error(userData.error);
    //         } else {
    //             setUserIsLoggedIn(true);
    //             console.log("userData:", userData);
    //             localStorage.setItem("token", userData.token);
    //             console.log("Successfully logged in. Here is the token:", userData.token);
    //         }
    //         // If the user successfully logs in, I need to show it somehow. However, this state should probably live in the Home component
    //         // For now, show the text 'You have logged in.'
    //         // Show a signout button
    //         // I also need signout functionaltity
    //     } catch (error) {
    //         console.log("An error occured.");
    //         console.log("Error:", error);
    //     }

    //     // These two might cause a problem
    //     setEmail("");
    //     setPassword("");
    // };

    const context = useContext(AppContext);

    if (!context) {
        throw new Error("Use this component inside of the AppContextProvider component.");
    }

    const { setUserIsLoggedIn } = context;

    interface IFormInput {
        email: string;
        password: string;
    }

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<IFormInput>();

    const handleUserLogin: SubmitHandler<IFormInput> = async (formData: IFormInput) => {
        const { email, password } = formData;
        console.log("email:", email);
        console.log("password:", password);
        console.log("This is the handleUserLogin function.");

        try {
            const response: Response = await fetch(`${API_URL}/signin`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const userData = await response.json();
            // if (!response.ok) {
            // }
            console.log("response:", userData);
            reset();
        } catch (error) {
            console.error("error:", error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(handleUserLogin)}>
                <div>
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
                </div>
                <div>
                    <label>
                        Password:
                        <input
                            type="password"
                            {...register("password", {
                                required: "Please enter your password.",
                            })}
                        />
                        {errors.password && <p>{errors.password.message}</p>}
                    </label>
                </div>
                <input type="submit" />
            </form>
        </div>
    );
};

export default UserLogin;
