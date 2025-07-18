import express from "express"
import cors from "cors";
import midsempdf from "./router/midsem.router.js"
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import adminRoutes from "./router/admin.route.js";

import path from "path";
const app = express();


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended:true, limit:"16kb"}));
// app.use(express.static("public"));
app.use(cookieParser());


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);
console.log(__filename)

app.use(express.static(path.join(__dirname, "frontend")));


app.use('/pdfs', express.static(path.join(__dirname, '../public/temp')));

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, "/frontend/home1.html"));
})
// app.get("/test", (req, res) => {
//   res.sendFile(path.join(__dirname, "../public/temp/bonafide.pdf"));
// });



app.use("/api",midsempdf)
app.use("/api/admin", adminRoutes);  // /api/admin/register and /login


export default app; 

