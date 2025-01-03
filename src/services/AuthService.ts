import axios from "axios";
import { ClientType } from "../models/ClientType";

const url = "http://localhost:8080/users";

export async function loginApi(email:string, password:string, clientType: ClientType){
    return  (await axios.post<string>(url + `/login?email=${email}&password=${password}&clientType=${clientType}`));
}

export async function logoutApi(token: string){
    return (await axios.delete<void>(url + "/logout?token=" + token));
}
