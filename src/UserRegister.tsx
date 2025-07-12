const API_URL = import.meta.env.VITE_API_URL;
import { SubmitHandler, useForm } from "react-hook-form";
import { Navigate } from "react-router";

const UserRegister: React.FC = () => {
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
                console.error("Error from UserSignup.tsx", result);
                throw new Error(result);
            } else {
                console.log("User successfully created.");
                // At this point I have a successful 201 status returned
                <Navigate to="/" />;
                console.log("Test after Navigate");
            }
        } catch (error) {
            // If the email is already in the database, I get to this catch block. But the error message doesn't tell me that.
            console.log("An error occured.");
            console.log("Error:", error); // This is not a useful error message.
        }
        reset(); // Think about the default value here
    };

    return (
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
                                    /[A-Z]/.test(value) || "Your password must contain at least one uppercase letter.",
                                hasLowercaseChar: (value) =>
                                    /[a-z]/.test(value) || "Your password must contain at least one lowercase letter.",
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
    );
};

export default UserRegister;
