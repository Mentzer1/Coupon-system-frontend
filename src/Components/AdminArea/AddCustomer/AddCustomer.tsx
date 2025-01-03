import { useNavigate } from "react-router-dom";
import { CustomerModel } from "../../../models/Customer";
import { addCustomerApi } from "../../../services/AdminService";
import "./AddCustomer.css";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";


export function AddCustomer(): JSX.Element {

    const {register, handleSubmit} = useForm<CustomerModel>()
    const navigate = useNavigate();

    function sendCustomer(newCustomer: CustomerModel){
        addCustomerApi(newCustomer)
        .then((res)=>{
            toast("Customer added! the status is: " + res.status)
            navigate("/customers")

        })
        .catch((err)=>{
            alert(err.response.data)
            console.log(err)
        })

    }

    return (
        <div className="AddCustomer">
			<form onSubmit={handleSubmit(sendCustomer)}>
                <input type="text" placeholder="firstName"{...register("firstName",{ required: "firstName is required" })} /><br />
                <input type="text" placeholder="lastName"{...register("lastName",{ required: "lastName is required" })} /><br />
                <input type="text" placeholder="email"{...register("email",{ required: "email is required" })} /><br />
                <input type="text" placeholder="password"{...register("password",{ required: "password is required" })} /><br />
                <button type="submit">Add Customer</button>
            </form>

        </div>
    );
}
