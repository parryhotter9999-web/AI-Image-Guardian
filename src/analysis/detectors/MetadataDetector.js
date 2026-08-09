import * as exifr from "exifr";

export class MetadataDetector {

    static async analyze(image) {

        const reasons = [];
        let metadata = null;

        try {

            metadata = await exifr.parse(image.file);

        } catch (error) {

            reasons.push({
                code: "METADATA_READ_ERROR",
                title: "Metadata could not be read",
                description: "The image metadata could not be analyzed."
            });

        }

        if (!metadata) {

            reasons.push({
                code: "NO_METADATA",
                title: "No camera metadata found",
                description:
                    "Many AI-generated or edited images contain little or no camera metadata."
            });

            return {

                detector: "Metadata",

                score: 30,

                confidence: 70,

                reasons,

                data: null

            };

        }

        if (!metadata.Make) {

            reasons.push({
                code: "MISSING_CAMERA_MAKE",
                title: "Camera manufacturer missing",
                description:
                    "No camera manufacturer information was found."
            });

        }

        if (!metadata.Model) {

            reasons.push({
                code: "MISSING_CAMERA_MODEL",
                title: "Camera model missing",
                description:
                    "No camera model information was found."
            });

        }

        if (metadata.Software) {

            reasons.push({
                code: "EDITING_SOFTWARE",
                title: "Editing software detected",
                description:
                    `Software: ${metadata.Software}`
            });

        }

        return {

            detector: "Metadata",

            score: reasons.length * 8,

            confidence: Math.min(
                reasons.length * 20,
                100
            ),

            reasons,

            data: metadata

        };

    }

}