export class ConfidenceCalculator {

    static calculate(results) {

        const totalScore =
            results.metadata.score +
            results.artifacts.score +
            results.ai.score;

        const likelihood = Math.min(totalScore, 100);

        let confidence = "Low";

        if (likelihood >= 70)
            confidence = "High";
        else if (likelihood >= 40)
            confidence = "Medium";

        return {

            likelihood,

            confidence

        };

    }

}