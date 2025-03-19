import { SubmitHandler, useForm } from "react-hook-form";

const UserSignup: React.FC = () => {
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

    const onSubmit: SubmitHandler<IFormInput> = async (
        formData: IFormInput
    ) => {
        console.log("Form submitted successfully:", formData);

        const { firstName, lastName, email, password } = formData;

        try {
            const response: Response = await fetch(
                "http://cities-api.rhysjenkins.uk/signup",
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
                                message:
                                    "Your password must be at least ten characters long.",
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
                                    /\d/.test(value) ||
                                    "Your password must contain at least one number.",
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

export default UserSignup;

// const handleUserFormSubmit = async (event: FormEvent) => {
// event.preventDefault();

// try {
//     const response: Response = await fetch(
//         "http://localhost:3000/signup",
//         {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//                 firstName,
//                 lastName,
//                 email,
//                 password,
//             }),
//         }
//     );

//     const result = await response.json();
//     if (!response.ok) {
//         throw new Error(result);
//     } else {
//         console.log("User successfully created.");
//     }
// } catch (error) {
//     console.log("An error occured.");
//     console.log("Error:", error);
// }
// };
