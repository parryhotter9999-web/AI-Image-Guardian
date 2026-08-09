import { OnnxService } from "../../services/OnnxService.js";

export class AIModelDetector {

    static async analyze(image) {

        const probability = await OnnxService.predict(image.bitmap);

        return {

            detector: "AI Model",

            score: probability * 100,

            confidence: probability,

            reasons: probability > 0.5
                ? ["Neural network predicts AI-generated image."]
                : ["Neural network predicts real photograph."],

            data: {

                probability,

                model: "AI Guardian ONNX"

            }

        };

    }

}