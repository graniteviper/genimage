import express from "express";
import {
  generateImage,
  generateImagesFromPack,
  trainModel as trainModelType,
} from "commontypes/types";
import prisma from "db/prisma";
import { S3Client } from "bun";
import { falAiModels } from "./models/falAiModels";
import dotenv from "dotenv";
import cors from "cors";
import { authMiddleware } from "./middlewares/auth.middleware";

dotenv.config();

const app = express();
app.use(cors());
const PORT = 8080;

app.use(express.json());

const falAiModel = new falAiModels();

app.get("/pre-signed-url", async (req, res) => {
  const key = `models/${Date.now()}_${Math.random()}.zip`;
    const url = new S3Client({
      accessKeyId: process.env.ACCESS_KEY_ID,
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
      bucket: process.env.BUCKET_NAME,
      endpoint: process.env.ENDPOINT_URL
    }).presign(key, {expiresIn: 3600,method: "PUT",type: "application/zip"});
    res.json({
      url,
      key
    });
    return;
});

app.post("/ai/training",authMiddleware, async (req, res) => {
  const parsedBody = trainModelType.safeParse(req.body);
  // console.log(req.body);
  if (!parsedBody.success) {
    res.status(400).json({ error: "Error while parsing body" });
    return;
  }

  const { request_id, response_url } = await falAiModel.trainModel(
    parsedBody.data.zipUrl,
    parsedBody.data.name
  );

  const response = await prisma.trainModel.create({
    data: {
      name: parsedBody.data.name,
      age: parsedBody.data.age,
      gender: parsedBody.data.gender,
      ethnicity: parsedBody.data.ethnicity,
      eyeColor: parsedBody.data.eyeColor,
      bald: parsedBody.data.bald,
      userId: req.userId!,
      falAIRequestId: request_id,
    },
  });

  res.json({
    modelId: response.id,
  });
  return;
});

app.post("/ai/generate",authMiddleware, async (req, res) => {
  const parsedBody = generateImage.safeParse(req.body);
  if (!parsedBody.success) {
    res.status(400).json({ error: "Error while parsing body" });
    return;
  }

  const model = await prisma.trainModel.findUnique({
    where: {
      id: parsedBody.data.modelId,
    },
  });

  if (!model || !model.tensorPath) {
    res.status(400).json({ error: "Model not found" });
    return;
  }

  const { request_id } = await falAiModel.generateImage(
    parsedBody.data.prompt,
    model?.tensorPath
  );

  const response = await prisma.outputImages.create({
    data: {
      prompt: parsedBody.data.prompt,
      modelId: parsedBody.data.modelId,
      userId: req.userId!,
      imageUrl: "",
      falAIRequestId: request_id,
    },
  });
  res.json({
    imageid: response.id,
  });
});

app.post("/pack/generate",authMiddleware, async (req, res) => {
  const parsedBody = generateImagesFromPack.safeParse(req.body);
  if (!parsedBody.success) {
    res.status(400).json({ error: "Error while parsing body" });
    return;
  }
  const prompts = await prisma.packPrompts.findMany({
    where: {
      packId: parsedBody.data.packId,
    },
  });

  let requestIds: string[] = [];

  prompts.map(async (prompt) => {
    const { request_id, response_url } = await falAiModel.generateImage(
      prompt.prompt,
      parsedBody.data.modelId
    );
    requestIds.push(request_id);
  });

  const response = await prisma.outputImages.createManyAndReturn({
    data: prompts.map((prompt, index) => ({
      prompt: prompt.prompt,
      modelId: parsedBody.data.modelId,
      userId: req.userId!,
      imageUrl: "",
      falAIRequestId: requestIds[index],
    })),
  });
  res.json({
    images: response.map((image) => image.id),
  });
  return;
});

app.get("/pack/bulk", async (req, res) => {
  const response = await prisma.pack.findMany({});
  res.json({
    response,
  });
  return;
});

app.get("/image/bulk",authMiddleware, async (req, res) => {
  const images = req.query.images as string[];
  const limit = parseInt(req.query.limit as string) || 10;
  const offset = req.query.offset as string;
  const imagesData = await prisma.outputImages.findMany({
    where: {
      id: { in: images },
      userId: req.userId,
    },
    skip: parseInt(offset),
    take: limit,
  });
  res.json({
    imagesData,
  });
  return;
});

app.post("/fal-ai/webhook/trainModel", async (req, res) => {
  console.log(req.body);

  const requestId = req.body.request_id;
  await prisma.trainModel.updateMany({
    where: {
      falAIRequestId: requestId,
    },
    data: {
      status: "Generated",
      tensorPath: req.body.tensor_path,
    },
  });

  res.json({
    message: "webhook received",
  });
  return;
});

app.post("/fal-ai/webhook/generateImage", async (req, res) => {
  console.log(req.body);

  const requestId = req.body.request_id;
  await prisma.outputImages.updateMany({
    where: {
      falAIRequestId: requestId,
    },
    data: {
      status: "Generated",
      imageUrl: req.body.image_url,
    },
  });

  res.json({
    message: "webhook received",
  });
  return;
});

app.listen(PORT, () => {
  console.log("Listening on 8080.");
});
