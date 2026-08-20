import { pipeline } from "@huggingface/transformers";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("Loading AI Image Detector...");

const detector = await pipeline(
  "image-classification",
  "onnx-community/ai-image-detection-ONNX"
);

console.log("MODEL LOADED!");

const imagePath = path.join(__dirname, "test-image.jpg");

console.log("Analyzing:", imagePath);

const result = await detector(imagePath);

console.log("\nRESULT:");
console.log(result);