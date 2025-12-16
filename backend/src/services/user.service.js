// import {userModel} from "../models/user.model.js";


export  function getAllUsers(req, res, next) {
    console.log(req.query);
    console.log(req.params);

    return res.status(200).json({message: "Get all users"});
}