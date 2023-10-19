const User = require("../schema/user")
import { Response } from "express"

type SignUpRequest  ={
  firstname: string;
  lastname: string;
  email: string;
 password: string;
country: string;

}

type loginRequest={
    email: string,
    password:string
}

 const loginController = async (req:Request, res:Response) => {
    const { email, password } = req.body as unknown as loginRequest
     try {
         await User.login(email, password);
         res.status(200).json({ email, password });

     }
     catch (error: any) {
         res.status(400).json({ error: error.message })
    }
}

 const signupController = async (req:Request, res:Response) => {
    const {firstname,lastname,email,password,country} = req.body as unknown as SignUpRequest
    try {
          await  User.signup(firstname, lastname, email, password, country)
             res.status(200).json({ firstname, lastname, email, password, country });

    }   
    catch (error: any) {
      console.error("Error caught:", error.message); // Add this line for debugging
      res.status(400).json({ error: error.message });
    }
    
    
}




module.exports = {
    loginController,
    signupController
}