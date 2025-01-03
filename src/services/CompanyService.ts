import axios from "axios";
import { CouponModel } from "../models/Coupon";
import { Category } from "../models/Category";
import { CompanyModel } from "../models/Company";

const url = "http://localhost:8080/api/company";

export async function addCouponApi(coupon: CouponModel){
    return (await axios.post<void>(url + "/coupon", coupon));
}

export async function updateCouponApi(coupon: CouponModel){
    return (await axios.put<void>(url + "/coupon", coupon));
}

export async function deleteCouponApi(id:number){
    return (await axios.delete<void>(url + "/" + id));
}

export async function getCompanyCouponsApi(){
    return (await axios.get<CouponModel[]>(url + "/coupons")).data;
}

export async function getCompanyCouponsByCategoryApi(category: Category){ //fix please
    return (await axios.get<CouponModel[]>(url + "/coupons/" + category)).data;
}

export async function getCompanyCouponsByPriceApi(max_price: number){//fix please
    return (await axios.get<CouponModel[]>(url + "/coupons/" + max_price)).data;
}

export async function getCompanyDetailsApi(){
    return (await axios.get<CompanyModel>(url + "/details")).data;
}

