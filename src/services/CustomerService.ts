import axios from "axios";
import { CouponModel } from "../models/Coupon";
import { Category } from "../models/Category";
import { CustomerModel } from "../models/Customer";


const url = "http://localhost:8080/api/customer";

export async function purchaseCouponApi(coupon: CouponModel){
    return (await axios.post<CouponModel>(url, coupon)).data;
}

export async function getCustomerCouponsApi(){
    return (await axios.get<CouponModel[]>(url + "/coupons")).data;
}

export async function getCustomerCouponsByCategoryApi(category: Category){//fix please
    return (await axios.get<CouponModel[]>(url + "/coupons/" + category)).data;
}

export async function getCustomerCouponsByPriceApi(max_price: number){//fix please
    return (await axios.get<CouponModel[]>(url + "/coupons/" + max_price)).data;
}

export async function getCustomerDetailsApi(){
    return (await axios.get<CustomerModel>(url + "/details")).data;
}

export async function getAllCouponsApi(){
    return (await axios.get<CouponModel[]>(url + "/all_coupons")).data;
}

export async function getCompanyNameApi(id: number){
    return (await axios.get<string>(url + "/company_name/" + id)).data;
}


