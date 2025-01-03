import { useForm } from "react-hook-form";
import "./Login.css";
import { ChangeEvent, useState } from "react";
import { ClientType } from "../../../models/ClientType";
import { loginApi } from "../../../services/AuthService";
import { authStore, login } from "../../../redux/AuthStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface LoginForm {
    email: string;
    password: string;
    clientType: ClientType;
}

export function Login(): JSX.Element {
    
    const navigate = useNavigate();

    const [selectValue, setSelectValue] = useState<ClientType>(ClientType.Administrator)

    const { register, handleSubmit } = useForm<LoginForm>();

    function sendLogin(data: LoginForm) {
        console.log("data: " + JSON.stringify(data))
        const { email, password, clientType } = data;
        loginApi(email, password, clientType)
            .then((res) => {
                toast("Login successful")
                authStore.dispatch(login(res?.data))
                navigate("/home")
            })
            .catch((err) => {
                // alert("Login failed")
                toast(err.response.data)
                // console.log("Login failed:", err);
                // console.error("Login failed:", err?.response?.data);
            });
    }    


    function handleSelectChange(event: ChangeEvent<HTMLSelectElement>): void {
        const value = event.target.value as ClientType;
        setSelectValue(value); 
        // setValue("clientType", value);
    }

    return (
        <div className="Login">
			<form onSubmit={handleSubmit(sendLogin)}>
                <input type="email" placeholder="email"{...register("email",{ required: "email is required" })} /><br />
                <input type="password" placeholder="password"{...register("password",{ required: "password is required" })} /><br />
                <select id="" {...register("clientType")} value={selectValue} onChange={(event) => handleSelectChange(event)}>
                    <option>{ClientType.Administrator}</option>
                    <option>{ClientType.Company}</option>
                    <option>{ClientType.Customer}</option>
                </select> <br />

                <button type="submit">Login</button>
            </form>

        </div>
    );
}

