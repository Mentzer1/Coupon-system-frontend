import { toast } from "react-toastify";
import { CustomerModel } from "../../../../models/Customer";
import { deleteCustomerApi } from "../../../../services/AdminService";
import "./CustomerCard.css";
import { useNavigate } from "react-router-dom";

interface CustomerProps{
    customer: CustomerModel
    setCustomers: React.Dispatch<React.SetStateAction<any>>;
}
export function CustomerCard(props: CustomerProps): JSX.Element {

    const navigate = useNavigate();

    
    function handleDeleteCustomer(customerId: number) {
        deleteCustomerApi(customerId);
        toast("Customer deleted!")
        console.log("Delete customer with ID:", customerId);

        props.setCustomers((prevCustomers: CustomerModel[]) =>
            prevCustomers.filter(customer => customer.id !== customerId)
        );
    }
    
    function handleEditCustomer(customer: CustomerModel) {
        navigate("/update_customer/" + props.customer.id)
    }
    
    return (
        <div className="CustomerCard">
            <p>
			    {props.customer.firstName + " " + props.customer.lastName}<br/>
                {props.customer.email}
            </p>
            <button onClick={()=>{handleDeleteCustomer(props.customer.id)}}>❌</button>    
            <button onClick={()=>{handleEditCustomer(props.customer)}}>✏️</button>

        </div>
    );
}
