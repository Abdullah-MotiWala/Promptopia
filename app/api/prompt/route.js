import Prompt from "@models/prompt"
import { connectToDB } from "@utils/database"
import mongoose from "mongoose"

export const GET = async (req) => {
    try {

        // await connectToDB()
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "promptopia",
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        const prompts = await Prompt.find({}).populate("creator")
        const response = new Response(JSON.stringify(prompts), { status: 200 })

        response.headers.set('Cache-Control', 'no-store')

        return response
    } catch (err) {
        console.log(err);
        return new Response("data fetching failed", { status: 500 })
    }
}