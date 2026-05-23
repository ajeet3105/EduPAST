
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


