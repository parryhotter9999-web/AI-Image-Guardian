export class ReportGenerator {

    static generate(results) {

        return {

            likelihood: results.confidence.likelihood,

            reasons: [

                ...results.metadata.reasons,

                ...results.artifacts.reasons,

                ...results.ai.reasons

            ],

            detectors: {

                metadata: results.metadata,

                artifacts: results.artifacts,

                ai: results.ai

            }

        };

    }

}