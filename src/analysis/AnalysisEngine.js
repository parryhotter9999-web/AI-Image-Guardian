import { ImageFeatureExtractor } from "./featureExtractor/ImageFeatureExtractor.js";
import { ImageLoader } from "../services/ImageLoader.js";
import { MetadataDetector } from "./detectors/MetadataDetector.js";
import { ArtifactDetector } from "./detectors/ArtifactDetector.js";
import { AIModelDetector } from "./detectors/AIModelDetector.js";
import { ConfidenceCalculator } from "./scoring/ConfidenceCalculator.js";
import { ReportGenerator } from "./reports/ReportGenerator.js";

export class AnalysisEngine {

    static async analyze(file) {

        console.log("=== Analysis Started ===");

        console.log("Loading image...");
        const image = await ImageLoader.load(file);

        console.log("Extracting features...");
        const features = await ImageFeatureExtractor.extract(image);
        console.table(features);

        console.log("Analyzing metadata...");
        const metadata = await MetadataDetector.analyze(image);

        console.log("Analyzing artifacts...");
        const artifacts = await ArtifactDetector.analyze(image, features);

        console.log("Running AI model...");
        const ai = await AIModelDetector.analyze(image);

        console.log("Calculating confidence...");
        const confidence = ConfidenceCalculator.calculate({
            metadata,
            artifacts,
            ai
        });

        console.log("Generating report...");
        const report = ReportGenerator.generate({
            metadata,
            artifacts,
            ai,
            confidence
        });

        console.log("=== Analysis Complete ===");
        console.log(report);

        return report;
    }

}