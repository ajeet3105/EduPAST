import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const adminSchema = new Schema({
    fullName:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    }
},
{
    timestamps:true,
});

adminSchema.pre("save", async function(next) {
    if(!this.isModified("password"))
        return next();
    this.password= await bcrypt.hash(this.password, 10)
    next();
})

adminSchema.methods.isPasswordCorrect = async function(password){
   return await bcrypt.compare(password,this.password)
}

adminSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      fullName: this.fullName, 
    },
    process.env.ACCESS_TOKEN_SECRET, 
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1d"
    }
  );
};

 const Admin = mongoose.model("Admin",adminSchema)

	export default Admin;

