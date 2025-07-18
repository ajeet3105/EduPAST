import express from "express"
import { uploadpdf } from "../controller/midsem.controller.js";
import { Router } from "express"
import {upload} from "../middleware/midsem.multer.js"
import { newmidSemPdf } from "../model/pdf.models.js";
import verifyToken from "../middleware/auth.middleware.js"
// import { verify } from "jsonwebtoken";


const router = Router();

router.post('/profile',verifyToken, upload.single('pdf'), uploadpdf)

router.get("/profile", (req, res) => {
return res.redirect("/pdf/PdfUpload.html")
});

router.get("/login",(req,res)=>{
  return res.redirect("/loginPage/login.html")
})


router.get("/pdf", async (req, res) => {
  try {
    const { branch, semester } = req.query;

    if (!branch || !semester) {
      return res.status(400).json({
        success: false,
        message: "Branch and semester are required",
      });
    }

    const results = await newmidSemPdf.find({
      Branch: branch.toLowerCase(),
      sem: parseInt(semester),
    });

    res.status(200).json({
      success: true,
      data: results,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
});

// /api/admin/me
router.get("/me", verifyToken, (req, res) => {
  res.status(200).json({
    success: true,
    message: "You are logged in",
    admin: req.user.fullName
  });
});




export default router;