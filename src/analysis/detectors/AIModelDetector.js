import { pipeline } from "@huggingface/transformers";

let detector = null;

async function loadDetector() {
    if (!detector) {
        console.log("Loading pretrained AI image detector...");

        detector = await pipeline(
            "image-classification",
            "onnx-community/ai-image-detection-ONNX"
        );

        console.log("Pretrained AI image detector loaded.");
    }

    return detector;
}

export class AIModelDetector {

    static async analyze(image) {

        console.log("Running pretrained AI detector...");

        const model = await loadDetector();

        // Convert the existing bitmap to a Blob.
        // Transformers.js accepts image data such as Blob/URL,
        // but not the ImageBitmap object used by ImageLoader.
        const canvas = document.createElement("canvas");

        canvas.width = image.bitmap.width;
        canvas.height = image.bitmap.height;

        const ctx = canvas.getContext("2d");

        if (!ctx) {
            throw new Error("Could not create canvas context.");
        }

        ctx.drawImage(
            image.bitmap,
            0,
            0,
            canvas.width,
            canvas.height
        );

        const blob = await new Promise((resolve, reject) => {
            canvas.toBlob(
                result => {
                    if (result) {
                        resolve(result);
                    } else {
                        reject(new Error("Could not convert image to Blob."));
                    }
                },
                "image/jpeg",
                0.95
            );
        });

        console.log("Image converted to Blob.");

        const results = await model(blob);

        console.log("AI detector results:", results);

        const fakeResult = results.find(
            result => result.label.toUpperCase() === "FAKE"
        );

        const realResult = results.find(
            result => result.label.toUpperCase() === "REAL"
        );

        if (!fakeResult || !realResult) {
            throw new Error(
                "AI detector returned unexpected labels: " +
                JSON.stringify(results)
            );
        }

        const aiProbability = fakeResult.score;
        const realProbability = realResult.score;

        console.log(
            "AI probability:",
            aiProbability
        );

        console.log(
            "Real probability:",
            realProbability
        );

        return {

            detector: "AI Image Detection Model",

            score: aiProbability * 100,

            confidence: aiProbability,

            reasons: aiProbability >= 0.5
                ? [
                    "The pretrained vision model predicts that the image is likely AI-generated."
                ]
                : [
                    "The pretrained vision model predicts that the image is likely authentic."
                ],

            data: {

                probability: aiProbability,

                realProbability: realProbability,

                model: "onnx-community/ai-image-detection-ONNX"

            }

        };
    }
}
// Preload the AI detector in the background when the app starts.
// This prevents the first image analysis from waiting for model initialization.
loadDetector()
    .then(() => {
        console.log("✅ AI detector preloaded and ready.");
    })
    .catch(error => {
        console.error("⚠️ AI detector preload failed:", error);
    });