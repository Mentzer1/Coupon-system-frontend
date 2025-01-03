import { Route, Routes } from "react-router-dom";
import "./Routing.css";
import { Home } from "../../CommonArea/Home/Home";
import { NotFound } from "../../CommonArea/NotFound/NotFound";
import { AddCompany } from "../../AdminArea/AddCompany/AddCompany";
import { AddCustomer } from "../../AdminArea/AddCustomer/AddCustomer";
import { AddCoupon } from "../../CompanyArea/AddCoupon/AddCoupon";
import { Layout } from "../Layout/Layout";
import { Login } from "../../AuthArea/Login/Login";
import { UpdateCompany } from "../../AdminArea/UpdateCompany/UpdateCompany";
import { UpdateCustomer } from "../../AdminArea/UpdateCustomer/UpdateCustomer";
import { UpdateCoupon } from "../../CompanyArea/UpdateCoupon/UpdateCoupon";
import { CompanyList } from "../../AdminArea/CompanyList/CompanyList";
import { CustomerList } from "../../AdminArea/CustomerList/CustomerList";
import { CompanyCouponsList } from "../../CompanyArea/CompanyCouponsList/CompanyCouponsList";
import { authStore } from "../../../redux/AuthStore";
import { ClientType } from "../../../models/ClientType";
import { MyCouponsList } from "../../CustomerArea/MyCouponsList/MyCouponsList";
import { AllCouponsList } from "../../CustomerArea/AllCouponsList/AllCouponsList";
import { useEffect, useState } from "react";

export function Routing(): JSX.Element {

    const [currClientType, setCurrClientType] = useState<ClientType>(authStore.getState().role);

    useEffect(()=>{
        authStore.subscribe(()=>{
            setCurrClientType(authStore.getState().role)
        })


    }, [])

    return (
        <div className="Routing">
		 <Routes>
            <Route path="/" Component={Layout} />
            <Route index path="/" Component={Home} />
            <Route path="/home" Component={Home} />

            <Route path="/login" Component={Login} />

            {/* Admin */}
            {
                currClientType === "Administrator" && 
                <>
                    <Route path="/companies" Component={CompanyList} />
                    <Route path="/add_company" Component={AddCompany} />
                    <Route path="/update_company/:id" Component={UpdateCompany} />
                    <Route path="/customers" Component={CustomerList} />
                    <Route path="/add_customer" Component={AddCustomer} />
                    <Route path="/update_customer/:id" Component={UpdateCustomer} />
                </>
            }

            {/* Company */}
            {
                currClientType === "Company" && 
                <>
                <Route path="/add_coupon" Component={AddCoupon} />
                <Route path="/update_coupon/:id" Component={UpdateCoupon} />
                <Route path="/coupons" Component={CompanyCouponsList} />
                </>
            }


            {/* Customer */}
            {
                currClientType === "Customer" && 
                <>
                <Route path="/coupons" Component={MyCouponsList}/>
                <Route path="/all_coupons" Component={AllCouponsList}/>
                </>
            }


            <Route path="*" Component={NotFound} />

        </Routes>

        </div>
    );
}
