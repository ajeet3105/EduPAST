
// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import cloudinary from "../utils/cloudinary.js";

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,

//   params: async (req, file) => {

//     const branch = req.body.Branch?.toLowerCase();
//     const sem = req.body.sem;

//     return {
//       folder: `midsem-pdfs/${branch}/sem${sem}`,

//       resource_type: "auto",
//       public_id:file.originalname + "-" + Date.now(),

//       use_filename: true,
//       unique_filename: true,
//     };
//   },
// });

// const upload = multer({ storage });

// export { upload };




import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "midsem-pdfs/all-papers", // Ek single root folder
    resource_type: "auto",
    format: "pdf", // Explicitly specifying PDF
    public_id: (req, file) => {
      return `${Date.now()}-${file.originalname.replace(/\.[^/.]+$/, "")}`;
    },
  },
});

const upload = multer({ 
  storage,
  limits: { fileSize: 15 * 1024 * 1024 } // 15MB limit taaki badi file se crash na ho
});

export { upload };
