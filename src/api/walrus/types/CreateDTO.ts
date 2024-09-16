export type CreateResponseDTO = {
    newlyCreated: {
        blobObject: {
            id: string;
            storedEpoch: number;
            blobId: string;
            size: number;
            erasureCodeType: string;
            certifiedEpoch: number;
            storage: {
                id: string;
                startEpoch: number;
                endEpoch: number;
                storageSize: number;
            };
        };
        encodedSize: number;
        cost: number;
    };
};

export const isCertified = (
    dto: CreateResponseDTO | CertifiedResponseDTO
): dto is CertifiedResponseDTO => "alreadyCertified" in dto;

export type CertifiedResponseDTO = {
    alreadyCertified: {
        blobId: string;
        event: {
            txDigest: string;
            eventSeq: string;
        };
        endEpoch: number;
    };
};
