import { useState, FormEvent } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const UserSignup: React.FC = () => {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    interface IFormInput {
        name: string;
        email: string;
        password: string;
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        console.log("Form submitted successfully:", data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>
                    First name:
                    {/* <input
                        type="text"
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                    /> */}
                    <input
                        {...register("name", { required: "Name is required" })}
                    />
                    {errors.name && <p>{errors.name.message}</p>}
                </label>
            </div>
            {/* <div>
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
            </div> */}
            <div>
                <label>
                    Password:
                    {/* <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    /> */}
                    <input
                        type="text"
                        {...register("password", {
                            required: "Please enter a password.",
                            minLength: {
                                value: 10,
                                message:
                                    "Your password must be at least ten characters long.",
                            },
                            pattern: {
                                value: /^(?=.*[A-Z])(?=.*[a-z]).{10,}$/,
                                message:
                                    "Your password must contain an uppercase and a lowercase letter.",
                            },
                        })}
                    />
                    {/* /^(?=.*[A-Z]).{6,}$/ */}
                    {/* /^(?=.*[A-Z])(?=.*[a-z]).{10,}$/ */}
                    {/* At least one uppercase: (?=.*[A-Z]) */}
                    {/* At least ten characters long: .{10,} */}
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

// // Reset form states
// setFirstName("");
// setLastName("");
// setEmail("");
// setPassword("");
// };
