const API_URL = import.meta.env.VITE_API_URL;
import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { AppContext } from "./Context";
import loginUser from "./fetchFunctions/loginUser";

const UserLogin: React.FC = () => {
    // App context
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("Use this component inside of the AppContextProvider component.");
    }
    const { setUserIsLoggedIn } = context; // Note that the context check above is essential; otherwise, TypeScript will throw an error

    const mutation = useMutation({
        mutationKey: ["loginUser"],
        mutationFn: loginUser,
        onSuccess: () => {
            setUserIsLoggedIn(true);
            navigate("/");
        },
        onError: () => {},
    });

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

    const navigate = useNavigate();

    const handleUserLogin: SubmitHandler<IFormInput> = async (formData: IFormInput) => {
        const { email, password } = formData;
        if (!email || !password) {
            console.error("The email and password fields are required.");
            return;
        }
        mutation.mutate({ email, password });
        reset();
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
