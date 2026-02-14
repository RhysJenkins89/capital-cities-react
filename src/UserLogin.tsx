const API_URL = import.meta.env.VITE_API_URL;
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useAppContext } from "./customHooks/useAppContext";
import loginUser from "./api/loginUser";

const UserLogin: React.FC = () => {
    const { setUserIsLoggedIn } = useAppContext();

    const mutation = useMutation({
        mutationKey: ["loginUser"],
        mutationFn: loginUser,
        onSuccess: (userData) => {
            console.log("userData from UserLogin:", userData);
            // I'll need to set context data here. It'll be something like:
            // setUser(userData);
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
