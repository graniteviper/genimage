import {z} from "zod";

export const trainModel = z.object({
    name: z.string(),
    age: z.number(),
    gender: z.enum(["male", "female","other"]),
    ethnicity: z.enum(["White", "Black", "Asian_American", "East_Asian", "South_Asian", "Hispanic", "Pacific", "Middle_Eastern", "Other"]),
    eyeColor: z.enum(["brown", "blue", "green", "hazel", "grey", "amber", "other"]),
    bald: z.boolean(),
    zipUrl: z.string(),
})

export const generateImage = z.object({
    prompt: z.string(),
    modelId: z.string(),
    number: z.number(),
})

export const generateImagesFromPack = z.object({
    modelId: z.string(),
    packId: z.string()
})