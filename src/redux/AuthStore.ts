import { jwtDecode } from "jwt-decode";
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ClientType } from "../models/ClientType";

interface AuthState{
    name: string;
    role: ClientType;
    token: string;
    id:number;
}

interface JwtUser{
    name: string;
    role: ClientType;
    iat: number;
    iss: string;
    id:number;
}


const initState = {
    token: localStorage.my_token ? localStorage.my_token : "",
    name: localStorage.my_token ? jwtDecode<JwtUser>(localStorage.my_token).name : "",
    role: localStorage.my_token ? jwtDecode<JwtUser>(localStorage.my_token).role : ClientType.Guest,
    id: localStorage.my_token ? jwtDecode<JwtUser>(localStorage.my_token).id : 0,
}

const authSlice = createSlice({
    name: "authSlice",
    initialState: initState,
    reducers:{
        login: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            // console.log("decode token: " + JSON.stringify(jwtDecode<JwtUser>(action.payload)))
            const decodedToken:JwtUser = jwtDecode<JwtUser>(action.payload)
            localStorage.setItem("my_token", "Bearer " + action.payload)

            // const decodedToken: JwtUser = jwtDecode<JwtUser>(localStorage.my_token);

            state.name = decodedToken.name;
            state.role = decodedToken.role;
            state.id = decodedToken.id;
        },
        logout: (state: AuthState) => {
            state.name = "";
            state.role = ClientType.Guest;
            state.token = "";
            state.id = 0;
            localStorage.removeItem("my_token");
        }
    }
});

export const {login, logout} = authSlice.actions;
export const authStore = configureStore({
    reducer: authSlice.reducer
});