
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,

  params: async (req, file) => {

    const branch = req.body.Branch?.toLowerCase();
    const sem = req.body.sem;

    return {
      folder: `midsem-pdfs/${branch}/sem${sem}`,

      resource_type: "auto",
      public_id:file.originalname + "-" + Date.now(),

      use_filename: true,
      unique_filename: true,
    };
  },
});

const upload = multer({ storage });

export { upload };




// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import cloudinary from "../utils/cloudinary.js";

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "midsem-pdfs/all-uploads", // Root folder for all PDFs
//     resource_type: "auto",
//     format: "pdf", // Explicitly specify PDF format for safety
//     public_id: (req, file) => {
//       // Safely generate a unique ID using timestamp
//       return `${Date.now()}-${file.originalname.replace(/\.[^/.]+$/, "")}`;
//     },
//   },
// });

// const upload = multer({ 
//   storage,
//   limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit lagayi taaki badi PDFs crash na karein
// });

// export { upload };



