import { Schema,model} from "mongoose";
const validator = require("validator")
const bcrypt = require("bcrypt");
interface IUSer {
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    country:String
    
 
}


const userSchema = new Schema<IUSer>({
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    country:{type:String,required:true}

})



userSchema.statics.login = async function (email: string, password: string) {
    if (!email || !password) {
        throw new Error("Please fill in all fields")
    }

    const user = await this.findOne({ email });
    if (!user) {
        throw new Error("Invalid Email")
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw new Error("Invalid Password")
    }


    return user


}



userSchema.statics.signup = async function (firstname: string, lastname: string, email: string, password: string, country: string) {
    

    if (!firstname || !password || !email || !password || !country) {
        throw new Error("Please fill in all fields")
    }  

    if (!validator.isEmail(email)) {
        throw Error("Please Enter a valid Email");
    }
    if (!validator.isStrongPassword(password)) {
        throw Error("Password not strong enough")
    }

    const exists = await this.findOne({ email })
    if (exists) {
        throw Error("User already exists")
    }

    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(password, salt) 

    
    const user = await this.create({ firstname, lastname, email,password:hash , country })
    
    return user


}

const User = model<IUSer>("User", userSchema);


module.exports = User



