export class Logger {

    static info(message, data = null) {

        console.log(
            `[AI Image Guardian] ${message}`,
            data ?? ""
        );

    }

    static warn(message, data = null) {

        console.warn(
            `[AI Image Guardian] ${message}`,
            data ?? ""
        );

    }

    static error(message, data = null) {

        console.error(
            `[AI Image Guardian] ${message}`,
            data ?? ""
        );

    }

}