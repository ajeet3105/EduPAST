import { newmidSemPdf } from "../model/pdf.models.js";


const uploadpdf = async (req,res)=>
{
  try{
    const pdflocalfilepath = req.file?.path;
    if(!pdflocalfilepath)
    {
       return res
       .status(400)
       .json({
        success:false,
        message: "pdfloacalpath is required",
       })
    }
    
const {Branch, sem, year, pdf_title} = req.body;
    
 // Make relative URL path for frontend (e.g. /pdfs/civil/sem4/file.pdf)
    const fileName = req.file.filename;
   //  const relativePath = `/pdfs/${fileName}`;  // this should match your express.static() route
   const fullUrl = `${req.protocol}://${req.get('host')}/pdfs/${fileName}`;

 

    const results= await newmidSemPdf.create({
      Branch: Branch.toLowerCase(),
      sem: parseInt(sem),
      year,
      pdf_title,
      PDF_Path: fullUrl,
    })
// return res.redirect("/home1.html")
return res.redirect("/home1.html?upload=success");

//  res.status(201).json({
//       success: true,
//       message: "uploaded successfully",
//       data:results,
//     });

  }
  catch(error)
  {
     res.status(400)
     .json({
        success:false,
        message:"server error",
        error:error.message,
     });
  }
};

export {uploadpdf};



