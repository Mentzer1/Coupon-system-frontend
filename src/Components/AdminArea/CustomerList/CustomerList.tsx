import { useNavigate } from "react-router-dom";
import { CustomerModel } from "../../../models/Customer";
import { getAllCustomersApi } from "../../../services/AdminService";
import { CustomerCard } from "../../CommonArea/Cards/CustomerCard/CustomerCard";
import "./CustomerList.css";
import { useEffect, useState } from "react";


export function CustomerList(): JSX.Element {

    const navigate = useNavigate();
    function goToAddCustomer(){
        navigate("/add_customer");
    }

    const [customers, setCustomers] = useState<CustomerModel[]>([]);

    useEffect(() =>{
        getAllCustomersApi()
        .then((res) => {
            setCustomers(res)
        })
        .catch((e) => {
            console.log(e)
        })
    }, [])

    return (
        <div className="CustomerList">
		    <button onClick={goToAddCustomer}>Add Customer</button>
			
            <div className="container">
            {customers.length > 0 ? (
                    customers.map((customer) => (
                        <CustomerCard key={customer.id} customer={customer} setCustomers={setCustomers} />
                    ))
                ) : (
                    <span>No customers available</span>
                )}
                </div>

        </div>
    );
}
