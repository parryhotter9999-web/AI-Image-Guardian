export class ImageFeatureExtractor {

    static async extract(image) {

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = image.width;
        canvas.height = image.height;

        ctx.drawImage(image.bitmap, 0, 0);

        const { data } = ctx.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
        );

        let totalRed = 0;
        let totalGreen = 0;
        let totalBlue = 0;
        let totalBrightness = 0;
        const brightnessValues = [];

        const pixelCount = data.length / 4;

        for (let i = 0; i < data.length; i += 4) {

            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            totalRed += r;
            totalGreen += g;
            totalBlue += b;

            const brightness = (r + g + b) / 3;

totalBrightness += brightness;

brightnessValues.push(brightness);

        }

        const averageRed = totalRed / pixelCount;
        const averageGreen = totalGreen / pixelCount;
        const averageBlue = totalBlue / pixelCount;

        const averageBrightness =
            totalBrightness / pixelCount;
let variance = 0;

for (const value of brightnessValues) {

    variance += Math.pow(
        value - averageBrightness,
        2
    );

}

variance /= pixelCount;

const contrast = Math.sqrt(variance);

            
        return {

            width: image.width,

            height: image.height,

            aspectRatio:
                image.width / image.height,

            pixelCount,

            averageRed,

            averageGreen,

            averageBlue,

            averageBrightness,

            contrast

        };

    }

}