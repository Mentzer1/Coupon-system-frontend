import axios from "axios";
import { CompanyModel } from "../models/Company";
import { CustomerModel } from "../models/Customer";

const url = "http://localhost:8080/api/admin";

export async function addCompanyApi(company: CompanyModel){
    return (await axios.post<void>(url + "/company", company));
}

export async function updateCompanyApi(company: CompanyModel){
    return (await axios.put<void>(url + "/company", company));
}

export async function deleteCompanyApi(id:number){
    return (await axios.delete<void>(url + "/company/" + id));
}

export async function getAllCompaniesApi(){
    return (await axios.get<CompanyModel[]>(url + "/companies")).data;
}

export async function getOneCompanyApi(id: number){
    return (await axios.get<CompanyModel>(url + "/company/" + id)).data;
}

export async function addCustomerApi(customer: CustomerModel){
    return (await axios.post<void>(url + "/customer", customer));
}

export async function updateCustomerApi(customer: CustomerModel){
    return (await axios.put<void>(url + "/customer", customer));
}

export async function deleteCustomerApi(id:number){
    return (await axios.delete<void>(url + "/customer/" + id));
}

export async function getAllCustomersApi(){
    return (await axios.get<CustomerModel[]>(url + "/customers")).data;
}

export async function getOneCustomerApi(id: number){
    return (await axios.get<CustomerModel>(url + "/customer/" + id)).data;
}
