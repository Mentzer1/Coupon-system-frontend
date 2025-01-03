import { useEffect, useState } from "react";
import { CompanyModel } from "../../../models/Company";
import "./CompanyList.css";
import { getAllCompaniesApi } from "../../../services/AdminService";
import { CompanyCard } from "../../CommonArea/Cards/CompanyCard/CompanyCard";
import { useNavigate } from "react-router-dom";

export function CompanyList(): JSX.Element {

    const navigate = useNavigate();
    function goToAddCompany(){
        navigate("/add_company");
    }
  
  
    const [companies, setCompanies] = useState<CompanyModel[]>([]);

    useEffect(() =>{
        getAllCompaniesApi()
        .then((res) => {
            setCompanies(res)
        })
        .catch((e) => {
            console.log(e)
        })
    }, [])


    return (
        <div className="CompanyList">
            <button onClick={goToAddCompany}>Add Company</button>
			
            <div className="container">
            {companies.length > 0 ? (
                    companies.map((company) => (
                        <CompanyCard key={company.id} company={company} setCompanies={setCompanies} />
                    ))
                ) : (
                    <span>No companies available</span>
                )}
                </div>

        </div>
    );
}
