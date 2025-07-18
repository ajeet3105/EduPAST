import mongoose, { Schema } from "mongoose";


const midSemPdf= new Schema({
   Branch: {
        type:String,
        required:true,
       enum: ["cse", "iot", "it", "ai_ds", "civil", "mechanical", "electronic", "chemical"]

    },
    sem:{
      type:Number,
      required:true,
      min:1,
      max:8,
    },
    year:{
      type:String,
      required:true,
    },
    pdf_title: {
    type: String,
    required: true, 
    },
    PDF_Path: {
    type: String,
    required: true, // e.g. "/pdfs/civil/sem4/Mechanics2024.pdf"
    },
    Uploaded_At: {
    type: Date,
    default: Date.now,
  },
},{
  timestamps:true,
}
)

export const newmidSemPdf = mongoose.model("pdfpaper",midSemPdf);
