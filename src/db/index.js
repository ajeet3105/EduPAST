import mongoose from "mongoose"
import { NAME_of_DB } from "../constants.js";
const contectDataBase = async () =>
{
    try{
        const connectionInsantance = await mongoose
        .connect(`${process.env.MONGODB_URL}/${NAME_of_DB}`);
        console.log(`\nMongoDB is connected!! DB HOST: ${connectionInsantance.connection.host}`)
    }
    catch(error)
    {
      console.log("MONGODB connrction erroe", error)
      process.exit(1);
    }
};
export default contectDataBase;