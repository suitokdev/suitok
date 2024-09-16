export interface VideoScheme {
    blobId: string;
    objectId: string;
    name: string;
    timestamp: number;
    size: number;
    certifiedEpoch: number;
    storedEpoch: number;
    startEpoch: number;
    endEpoch: number;
    cost: number;
}
