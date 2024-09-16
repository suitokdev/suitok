import axios, { AxiosProgressEvent } from "axios";
import { RcFile } from "antd/es/upload";
import { aggregator } from "../../../configs/walrus/aggregator";
import { publisher } from "../../../configs/walrus/publisher";
import { CertifiedResponseDTO, CreateResponseDTO } from "../types/CreateDTO";

class WalrusHttpApi {
    private readonly publisherUrl = publisher;
    private readonly aggregatorUrl = aggregator;
    constructor() {}

    public async storeBlob(
        file: RcFile | Blob,
        fileName: string,
        onUploadProggress: (num: number) => void
    ): Promise<CreateResponseDTO | CertifiedResponseDTO> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onloadend = async () => {
                const arrayBuffer = reader.result as ArrayBuffer;

                const response = await axios.put<CreateResponseDTO | CertifiedResponseDTO>(
                    this.publisherUrl + "/store",
                    arrayBuffer,
                    {
                        headers: {
                            "Content-Type": "application/octet-stream",
                        },
                        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
                            const progress = Math.floor((progressEvent.progress ?? 0) * 100);
                            return onUploadProggress(progress);
                        },
                    }
                );
                resolve(response.data);
            };

            reader.readAsArrayBuffer(file);
        });
    }
}
export const walrusHttpApi = new WalrusHttpApi();
