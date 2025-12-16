import { get } from "mongoose";
import { getAllUsers } from "../services/user.service.js";



export function getUsers(req, res, next) {
    
    getAllUsers(req, res, next);
};

