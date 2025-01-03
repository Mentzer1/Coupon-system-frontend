import { useState } from "react";
import { CompanyModel } from "../../../../models/Company";
import { deleteCompanyApi } from "../../../../services/AdminService";
import "./CompanyCard.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface CompanyProps{
    company: CompanyModel;
    setCompanies?: React.Dispatch<React.SetStateAction<any>>;

}

export function CompanyCard(props: CompanyProps): JSX.Element {    

    const navigate = useNavigate();

    function handleDeleteCompany(companyId: number) {
        deleteCompanyApi(companyId);
        toast("Company deleted!")
        console.log("Delete company with ID:", companyId);

        if(props.setCompanies){
        props.setCompanies((prevCompanies: CompanyModel[]) =>
            prevCompanies.filter(company => company.id !== companyId)
        );
    }
}
    
    function handleEditCompany(company: CompanyModel) {
        navigate("/update_company/" + props.company.id)
    }
    

    return (
        <div className="CompanyCard">
			<p>
                {props.company.name}<br/>
                {props.company.email}
            </p>
            <button onClick={()=>{handleDeleteCompany(props.company.id)}}>❌</button>    
            <button onClick={()=>{handleEditCompany(props.company)}}>✏️</button>

        </div>
    );
}
