import axios from "axios";
import type { IUserLoginDto, IUserSignupDto } from "@/types/auth.types";

const login = async(data: IUserLoginDto)=>{
    try {
        const response = await axios.post('/api/auth/login', data);
        return response;
    } catch (error) {
        console.error("Login failed", {error});
        throw error;
    }
}

const signup = async(data: IUserSignupDto)=>{
    try {
        const response = await axios.post('/api/auth/signup', data);
        return response;
    } catch (error) {
        console.error("Signup failed", {error});
        throw error;
    }
}

const logout = async()=>{
    try {
        const response = await axios.post("/api/auth/logout");
        return response;
    } catch (error) {
        console.error("Logout Failed", {error});
        throw error;
    }
}

export {
    login,
    signup,
    logout,
}