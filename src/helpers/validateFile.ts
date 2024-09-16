import { message } from "antd";
import { RcFile } from "antd/es/upload";
import { MAX_FILE_WEIGHT } from "../configs/";

export const validateFile = (file: RcFile) => {
    const isMP4 = file.type === "video/mp4";
    const isUnder10MB = file.size < MAX_FILE_WEIGHT;
    if (!isUnder10MB) {
        message.error(`File size is too big. Must be less than 10MB`);
        return false;
    }
    if (!isMP4) {
        message.error(`${file.name} is not a png file`);
        return false;
    }
    return true;
};
