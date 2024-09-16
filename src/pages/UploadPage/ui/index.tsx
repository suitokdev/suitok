import { RcFile } from "antd/es/upload";
import { Dragndrop } from "../../../components/dragndrop";
import s from "./UploadPage.module.sass";
import { GetProps, Input, message, Progress } from "antd";
import { useCallback, useState } from "react";
import Dragger from "antd/es/upload/Dragger";
import { walrusHttpApi } from "../../../api/walrus/controller";
import { validateFile } from "../../../helpers/validateFile";
import { Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { isCertified } from "../../../api/walrus/types/CreateDTO";
import { Link } from "react-router-dom";
import { firebaseCustomClient } from "../../../api/firebase";

type Props = GetProps<typeof Dragger>;
type File = RcFile | Blob | string;

export const UploadPage = () => {
    const [fileCustomName, setFileCustomName] = useState("");
    const [loading, setLoading] = useState(false);
    const [resultId, setResultId] = useState<string | null>(null);
    const [alreadyLoaded, setAlreadyLoaded] = useState(false);
    const [error, setError] = useState<null | string>(null);
    const [uploadProggress, setUploadProggress] = useState<null | number>(null);
    const [file, setFile] = useState<File | null>(null);

    const resetLastResult = () => {
        setResultId(null);
        setAlreadyLoaded(false);
        setUploadProggress(null);
        setError(null);
    };

    const onUploadProggress = (num: number) => setUploadProggress(num);

    const storeVideo = useCallback(async () => {
        try {
            if (!file || typeof file === "string") return message.error("File does not exist");
            setLoading(true);
            const response = await walrusHttpApi.storeBlob(file, fileCustomName, onUploadProggress);
            if (!response) throw new Error();
            if (isCertified(response)) return setAlreadyLoaded(true);
            const createdObj = response.newlyCreated;
            const createdBlobObj = createdObj.blobObject;
            const storage = createdBlobObj.storage;
            setAlreadyLoaded(false);
            setResultId(createdObj.blobObject.blobId);
            await firebaseCustomClient.saveNewVideo({
                blobId: createdBlobObj.blobId,
                objectId: createdBlobObj.id,
                name: fileCustomName,
                timestamp: Date.now(),
                size: createdBlobObj.size,
                certifiedEpoch: createdBlobObj.certifiedEpoch,
                storedEpoch: createdBlobObj.storedEpoch,
                startEpoch: storage.startEpoch,
                endEpoch: storage.endEpoch,
                cost: createdObj.cost,
            });
        } catch (error) {
            message.error("HTTP Error");
            setError("HTTP Error");
        } finally {
            setLoading(false);
        }
    }, [file, fileCustomName]);

    const nameChangeHandler = (name: string) => {
        setFileCustomName(name);
    };

    const customRequest: Props["customRequest"] = async (options) => {
        resetLastResult();
        options.onSuccess?.("Ok");
        updateFile(options.file);
    };

    const updateFile = (file: File | null) => {
        resetLastResult();
        setFile(file);
    };

    const allowUpload = !!file && !!fileCustomName && !loading;

    return (
        <div className={s.uploadWrapper}>
            <Dragndrop
                validateFile={validateFile}
                customRequest={customRequest}
                onRemove={() => updateFile(null)}
                loading={loading}
            />

            <div className={s.inputArea}>
                <p className={s.label}>Video name</p>
                <Input
                    placeholder="Enter video name"
                    size="large"
                    disabled={loading}
                    value={fileCustomName}
                    onChange={(e) => nameChangeHandler(e.target.value)}
                    maxLength={100}
                />
            </div>

            <Button
                type="primary"
                icon={<UploadOutlined />}
                size={"large"}
                onClick={storeVideo}
                disabled={!allowUpload}
            >
                Upload
            </Button>

            {resultId && !alreadyLoaded && !loading ? (
                <div className={s.result}>
                    Success! You can <Link to={"/video/" + resultId}>watch your video here</Link>
                </div>
            ) : null}
            {alreadyLoaded ? (
                <p className={s.result} style={{ color: "var(--color-danger)" }}>
                    This video was already uploaded
                </p>
            ) : null}
            {uploadProggress !== null ? (
                <p className={s.result}>
                    <Progress
                        percent={uploadProggress ?? 0}
                        status={loading ? "active" : error ? "exception" : undefined}
                    />
                </p>
            ) : null}
        </div>
    );
};
