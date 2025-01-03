import { toast } from "react-toastify";
import { CustomerModel } from "../../../models/Customer";
import { getOneCustomerApi, updateCustomerApi } from "../../../services/AdminService";
import "./UpdateCustomer.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export function UpdateCustomer(): JSX.Element {
    const { register, handleSubmit, setValue } = useForm<CustomerModel>();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        if (id) {
            getOneCustomerApi(Number(id)) 
                .then((customer) => {
                    setValue("firstName", customer.firstName);
                    setValue("lastName", customer.lastName);
                    setValue("email", customer.email);
                    setValue("password", customer.password);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        }
    }, [id, setValue]);
    

    function sendCustomer(updatedCustomer: CustomerModel) {
        updatedCustomer.id = Number(id);
        updateCustomerApi(updatedCustomer)
            .then((res) => {
                toast("Customer updated! The status is: " + res.status);
                navigate("/customers");
            })
            .catch((err) => {
                console.log(err);
            });
    }

    if (loading) {
        return <div>Loading...</div>; 
    }
    
    return (
        <div className="UpdateCustomer">
            <form onSubmit={handleSubmit(sendCustomer)}>
                <input
                    type="text"
                    placeholder="First name"
                    {...register("firstName", { required: "First name is required" })}
                /><br />
                <input
                    type="text"
                    placeholder="Last name"
                    {...register("lastName", { required: "Last name is required" })}
                /><br />
                <input
                    type="email"
                    placeholder="Email"
                    {...register("email", { required: "Email is required" })}
                /><br />
                <input
                    type="text"
                    placeholder="Password"
                    {...register("password", { required: "Password is required" })}
                /><br />
                <button type="submit">Update</button>
            </form>
			
        </div>
    );
}
