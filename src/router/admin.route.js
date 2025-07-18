import { Router } from "express";
import Admin from "../model/admin.js"
// import jwt from "jsonwebtoken";

const router = Router()

router.post("/register", async (req, res) => {
  try {
    const { fullName, password } = req.body;
    console.log("req.body", req.body);

    if (!fullName || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //  use Admin instead of users
    const existingUser = await Admin.findOne({ fullName });
    if (existingUser) {
      return res.status(400).json({ message: "fullName is already in use" });
    }

    //  store result from create
    const newAdmin = await Admin.create({
       fullName,
        password
       });

    res.status(201).json({
      message: "Admin registered successfully",
      adminId: newAdmin._id,
    });

  } catch (error) {
    console.error("Signup Error:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
 

   
router.post("/login", async (req,res) =>{
    try{
        const {fullName, password} = req.body;

        if(!fullName || !password)
        {
          return res.status(400).send("all fields are required")
        }

     const admin = await Admin.findOne({ fullName})
     if(!admin)
     {
        return res.status(401).send("Invalid fullname or password")
     }

     const isMatch = await admin.isPasswordCorrect(password)
     if(!isMatch)
     {
        return req.status(401).send("Invalid fullName or password")
     }

    const token =  admin.generateAccessToken()
     //  Set token in cookie
     res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production (HTTPS)
      sameSite: "Lax",
      maxAge: 24 * 60 * 60 * 1000 // 1 day 
     
    });
 console.log("token", token)
  //  res.status(200).
  //  json({ 
  //   message: "Login successful", 
  //   token });
    //  Redirect to home page after login
    return res.redirect("/home1.html");
    // return res.redirect("/pdf/Upload.html")

 //  Token Cookie Me Store Ho Jayega
   
    } catch (error) {
  console.error("Signin error:", error.message);
//   return res.redirect("/login.html"); 


    }
});




export default router;