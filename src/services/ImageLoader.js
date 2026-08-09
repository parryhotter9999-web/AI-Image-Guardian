export class ImageLoader {

    static async load(file) {

        if (!(file instanceof File)) {
            throw new Error("ImageLoader: Invalid file.");
        }

        const bitmap = await createImageBitmap(file);

        return {

            file,

            bitmap,

            width: bitmap.width,

            height: bitmap.height,

            size: file.size,

            type: file.type,

            name: file.name

        };

    }

}