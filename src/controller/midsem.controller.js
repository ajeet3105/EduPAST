import { newmidSemPdf } from "../model/pdf.models.js";




const uploadpdf = async (req, res) => {
  try {

    console.log(req.file);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File not uploaded",
      });
    }

    const cloudinaryFileUrl = req.file.path;

    const { Branch, sem, year, pdf_title } = req.body;

    const results = await newmidSemPdf.create({
      Branch: Branch.toLowerCase(),
      sem: parseInt(sem),
      year,
      pdf_title,
      PDF_Path: cloudinaryFileUrl,
    });

    return res.redirect("/index.html?upload=success");

  } catch (error) {
    res.status(400).json({
      success: false,
      message: "server error",
      error: error.message,
    });
  }
};

export {uploadpdf};



