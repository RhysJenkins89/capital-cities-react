const API_URL = import.meta.env.VITE_API_URL;
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";

const UserRegister: React.FC = () => {
    const [emailAlreadyExists, setEmailAlreadyExists] = useState<boolean>(false);

    interface IFormInput {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    }

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<IFormInput>();

    const navigate = useNavigate();

    const onSubmit: SubmitHandler<IFormInput> = async (formData: IFormInput) => {
        const { firstName, lastName, email, password } = formData;
        try {
            const response: Response = await fetch(`${API_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    password,
                }),
            });
            console.log("response:", response);
            const result = await response.json();
            if (!response.ok) {
                console.error("Error from UserRegister.tsx", result); // When we get here, I want to display the message on the frontend
                throw new Error(result);
            } else {
                console.log("User successfully created.");
                navigate("/signin");
            }
        } catch (error) {
            setEmailAlreadyExists(true);
            // If the email is already in the database, I get to this catch block. But the error message doesn't tell me that.
            console.log("An error occured.");
            console.log("Error:", error); // This is not a useful error message.
        }
        reset(); // Think about the default value here

        // In this function I must:
        // Replace the fetch function with a useQuery mutation
        // Type the result on line 36
        // Type the error on line 44
        // Send a more meaningful error message to the frontend if I get to this catch block
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>
                        First name:
                        <input
                            {...register("firstName", {
                                required: "Please enter your first name.",
                                validate: {
                                    containsOnly: (value) =>
                                        /^[A-Za-z-' ]+$/.test(value) ||
                                        "The first name field must contain only letters, spaces, hyphens, or apostrophes.",
                                },
                            })}
                        />
                        {errors.firstName && <p>{errors.firstName.message}</p>}
                    </label>
                </div>
                <div>
                    <label>
                        Last name:
                        <input
                            {...register("lastName", {
                                required: "Please enter your last name.",
                                validate: {
                                    containsOnly: (value) =>
                                        /^[A-Za-z-' ]+$/.test(value) ||
                                        "The last name field must contain only letters, spaces, hyphens, or apostrophes.",
                                },
                            })}
                        />
                        {errors.lastName && <p>{errors.lastName.message}</p>}
                    </label>
                </div>
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
                            type="text" // Change back to type="password"
                            {...register("password", {
                                required: "Please enter a password.",
                                minLength: {
                                    value: 10,
                                    message: "Your password must be at least ten characters long.",
                                },
                                validate: {
                                    hasUppercaseChar: (value) =>
                                        /[A-Z]/.test(value) ||
                                        "Your password must contain at least one uppercase letter.",
                                    hasLowercaseChar: (value) =>
                                        /[a-z]/.test(value) ||
                                        "Your password must contain at least one lowercase letter.",
                                    hasSpecialChar: (value) =>
                                        /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                                        "Your password must contain at least one special character.",
                                    hasNumber: (value) =>
                                        /\d/.test(value) || "Your password must contain at least one number.",
                                },
                            })}
                        />
                        {errors.password && <p>{errors.password.message}</p>}
                    </label>
                </div>
                <input type="submit" />
            </form>
            {emailAlreadyExists && (
                <div>
                    <p>That email already exists in the database.</p>
                    {/* Use the error message from the backend here. */}
                </div>
            )}
        </>
    );
};

export default UserRegister;
