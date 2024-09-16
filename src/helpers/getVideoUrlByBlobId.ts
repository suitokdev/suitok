import { aggregator } from "../configs/walrus/aggregator";

export const getVideoUrlByBlobId = (blobId?: string) => aggregator + "/" + blobId;
