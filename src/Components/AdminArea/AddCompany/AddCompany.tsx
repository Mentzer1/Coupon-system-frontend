import { CompanyModel } from "../../../models/Company";
import { addCompanyApi} from "../../../services/AdminService";
import { useForm } from "react-hook-form";
import "./AddCompany.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function AddCompany(): JSX.Element {

    const {register, handleSubmit} = useForm<CompanyModel>()
    const navigate = useNavigate();

    function sendCompany(newCompany: CompanyModel){
        addCompanyApi(newCompany)
        .then((res)=>{
            toast("Company added! the status is: " + res.status)
            navigate("/companies")
        })
        .catch((err)=>{
            alert(err.response.data)
            console.log(err)
        })

    }
    return (
        <div className="AddCompany">
			<form onSubmit={handleSubmit(sendCompany)}>
                <input type="text" placeholder="name"{...register("name",{ required: "name is required" })} /><br />
                <input type="email" placeholder="email"{...register("email",{ required: "email is required" })} /><br />
                <input type="text" placeholder="password"{...register("password",{ required: "password is required" })} /><br />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}
