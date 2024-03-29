import Prompt from "@models/prompt"
import { connectToDB } from "@utils/database"

export const GET = async (req) => {
    try {

        await connectToDB()

        const prompts = await Prompt.find({}).populate("creator")
        const response = new Response(JSON.stringify(prompts), { status: 200 })

        response.headers.set('Cache-Control', 'no-store, must-revalidate')

        return response
    } catch (err) {
        return new Response("data fetching failed", { status: 500 })
    }
}