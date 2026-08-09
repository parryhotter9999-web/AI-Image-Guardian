let ort = null;
let session = null;

export class OnnxService {

    static async loadModel() {

        if (session) return session;

        // Load ONNX Runtime only when needed
        if (!ort) {
            ort = await import("onnxruntime-web");
        }

        session = await ort.InferenceSession.create(
            "/models/ai_guardian.onnx"
        );

        return session;
    }

    static async predict(bitmap) {

        const session = await this.loadModel();

        const canvas = document.createElement("canvas");
        canvas.width = 224;
        canvas.height = 224;

        const ctx = canvas.getContext("2d");

        ctx.drawImage(bitmap, 0, 0, 224, 224);

        const { data } = ctx.getImageData(
            0,
            0,
            224,
            224
        );

        const input = new Float32Array(224 * 224 * 3);

        let p = 0;

        for (let i = 0; i < data.length; i += 4) {

            input[p++] = data[i] / 255;
            input[p++] = data[i + 1] / 255;
            input[p++] = data[i + 2] / 255;

        }

        const tensor = new ort.Tensor(
            "float32",
            input,
            [1, 224, 224, 3]
        );

        const results = await session.run({
            "args_0:0": tensor
        });

        const output = Object.values(results)[0].data[0];

        console.log("Raw ONNX output:", output);

        return output;
    }
}