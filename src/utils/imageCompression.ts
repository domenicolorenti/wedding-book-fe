import imageCompression from "browser-image-compression";

export const compressImage = async (file: File): Promise<File> => {
    const options = {
        maxWidthOrHeight: 1024,
        useWebWorker: true,
        // Fix orientation issues from mobile cameras (1 = auto-detect)
    };

    try {
        const compressedFile = await imageCompression(file, options);
        return compressedFile;
    } catch (error) {
        // If compression fails, return original file
        console.warn("Image compression failed, using original file", error);
        return file;
    }
}