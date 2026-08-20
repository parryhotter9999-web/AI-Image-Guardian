export class ConfidenceCalculator {

    static calculate(results) {

        // AI detector score is already a percentage.
        // Keep the displayed result between 1% and 99%.
        let likelihood = Math.round(results.ai.score);

        likelihood = Math.max(1, Math.min(99, likelihood));

        return {
            likelihood
        };

    }

}