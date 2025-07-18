
import dotenv from "dotenv"
import contectDataBase from "./db/index.js"
import app from "./app.js"
dotenv.config({
    path: "./.env",
})



contectDataBase().then(()=>{
    app.listen(process.env.PORT || 6600, ()=>{
        console.log(`Server is running at port ${process.env.PORT}`);
    })
})
.catch((error) => {
    console.log("MONGODB connetion failed!!!", error)
})