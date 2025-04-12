import { fal } from "@fal-ai/client";
import dotenv from "dotenv";

dotenv.config();
fal.config({
    credentials: process.env.FAL_AI_TEST_KEY
  });

export class falAiModels{
    constructor(){}

    public async generateImage(prompt: string, tensorPath: string){
        const {request_id,response_url} = await fal.queue.submit("fal-ai/flux-lora", {
            input: {
                prompt,
                loras: [{path: tensorPath, scale: 1.0}]
            },
            webhookUrl: `${process.env.FAL_AI_WEBHOOK}/generateImage`
          });
        return { request_id,response_url };  
    };

    public async trainModel(zipUrl: string,triggerWord: string){
        const {request_id,response_url} = await fal.queue.submit("fal-ai/flux-lora-fast-training", {
            input: {
                images_data_url: zipUrl,
                trigger_word: triggerWord
            },
            webhookUrl: `${process.env.FAL_AI_WEBHOOK}/trainModel`
          });

          return { request_id,response_url };
    }
}