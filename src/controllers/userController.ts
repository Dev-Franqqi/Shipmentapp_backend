const User = require("../schema/user")
import { Response } from "express"
const jwt = require("jsonwebtoken")

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

const createToken = (_id:string) => {
    jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" })
    return
}
 const loginController = async (req:Request, res:Response) => {
    const { email, password } = req.body as unknown as loginRequest
     try {
         const user = await User.login(email, password);
         const token = createToken(user._id)
         res.status(200).json({ email, token});

     }
     catch (error: any) {
         res.status(400).json({ error: error.message })
    }
}

 const signupController = async (req:Request, res:Response) => {
    const {firstname,lastname,email,password,country} = req.body as unknown as SignUpRequest
    try {
        const user = await User.signup(firstname, lastname, email, password, country)
        const token = createToken(user._id)
             res.status(200).json({ email,token });

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