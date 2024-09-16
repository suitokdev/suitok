import { InboxOutlined, LoadingOutlined } from "@ant-design/icons";
import type { GetProps, UploadProps } from "antd";
import { Upload } from "antd";
import s from "./Dragndrop.module.sass";
import { FC } from "react";
import { RcFile } from "antd/es/upload";
const { Dragger } = Upload;

type Props = GetProps<typeof Dragger>;

interface DragndropProps {
    validateFile: (file: RcFile) => boolean;
    customRequest: Props["customRequest"];
    onRemove?: Props["onRemove"];
    onChange?: Props["onChange"];
    fileName?: string;
    loading?: boolean;
}

export const Dragndrop: FC<DragndropProps> = ({
    validateFile,
    customRequest,
    onRemove,
    onChange,
    fileName = "video",
    loading = false,
}) => {
    const props: UploadProps = {
        name: fileName,
        accept: "video/mp4,video/webm",
        maxCount: 1,
        multiple: false,
        beforeUpload: (file) => {
            return validateFile(file) || Upload.LIST_IGNORE;
        },
        customRequest,
        onRemove,
        onChange,
    };

    return (
        <div className={s.dragndrop}>
            <Dragger {...props} disabled={loading}>
                <p className="ant-upload-drag-icon">
                    {loading ? <LoadingOutlined /> : <InboxOutlined />}
                </p>
                <p className="ant-upload-text">Click or drag video to this area to upload</p>
                <p className="ant-upload-hint">
                    Video must be in mp4 or .webm format and weigh less than 10 MB
                </p>
            </Dragger>
        </div>
    );
};
