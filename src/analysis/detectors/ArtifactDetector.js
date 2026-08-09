export class ArtifactDetector {

    static async analyze(image, features) {

        let score = 0;

        const reasons = [];

        // Low Resolution
        if (features.width < 768 || features.height < 768) {

            score += 10;

            reasons.push({
                code: "LOW_RESOLUTION",
                title: "Low Resolution",
                description:
                    "Low-resolution images contain less detail and are more difficult to verify."
            });

        }

        // Very Low Contrast
        if (features.contrast < 25) {

            score += 15;

            reasons.push({
                code: "LOW_CONTRAST",
                title: "Very Low Contrast",
                description:
                    "Extremely low contrast may indicate excessive smoothing or AI generation."
            });

        }

        // Very Dark Image
        if (features.averageBrightness < 40) {

            score += 8;

            reasons.push({
                code: "VERY_DARK",
                title: "Very Dark Image",
                description:
                    "Dark images hide details and reduce verification accuracy."
            });

        }

        // Very Bright Image
        if (features.averageBrightness > 220) {

            score += 8;

            reasons.push({
                code: "VERY_BRIGHT",
                title: "Very Bright Image",
                description:
                    "Overexposed images may hide important visual information."
            });

        }

        return {

            detector: "Artifact Detector",

            score,

            confidence: 60,

            reasons,

            data: features

        };

    }

}