import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai'
 
// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config)
 
// IMPORTANT! Set the runtime to edge
export const runtime = 'edge'
 
export async function POST(req) {
  try {
    // Extract the `messages` from the body of the request
    const { messages } = await req.json()
    console.log('messages', messages)
  
    // Ask OpenAI for a streaming chat completion given the prompt
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      stream: true,
      messages,
    })
    //return response;
    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response)
    // Respond with the stream
    console.log('la respuesta funciona')
    return new StreamingTextResponse(stream)
  } catch (error) {
    console.log('error en la api')
    console.error(error)
    res.status(500).send('Internal Server Error');
  }
}
