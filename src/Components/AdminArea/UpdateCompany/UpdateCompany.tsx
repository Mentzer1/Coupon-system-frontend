import { useForm } from "react-hook-form";
import "./UpdateCompany.css";
import { CompanyModel } from "../../../models/Company";
import { useNavigate, useParams } from "react-router-dom";
import { getOneCompanyApi, updateCompanyApi } from "../../../services/AdminService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export function UpdateCompany(): JSX.Element {
    const { register, handleSubmit, setValue } = useForm<CompanyModel>();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            getOneCompanyApi(Number(id)) 
                .then((company) => {
                    setValue("name", company.name);
                    setValue("email", company.email);
                    setValue("password", company.password);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        }
    }, [id, setValue]);

    function sendCompany(updatedCompany: CompanyModel) {
        updatedCompany.id = Number(id);
        updateCompanyApi(updatedCompany)
            .then((res) => {
                toast("Company updated! The status is: " + res.status);
                navigate("/companies");
            })
            .catch((err) => {
                console.log(err);
            });
    }

    if (loading) {
        return <div>Loading...</div>; 
    }

    return (
        <div className="UpdateCompany">
            <form onSubmit={handleSubmit(sendCompany)}>
                <input
                    type="text"
                    placeholder="Name"
                    {...register("name", { required: "Name is required" })}
                    disabled
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
