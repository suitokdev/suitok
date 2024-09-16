import {
    addDoc,
    collection,
    DocumentData,
    getDocs,
    limit,
    orderBy,
    query,
    where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { SaveNewVideoDTO } from "./types/SaveNewVideoDTO";
import { VideoScheme } from "./types/VideoScheme";
import { GetLastVideosDTO } from "./types/GetLastVideosDTO";
import { message } from "antd";

class FirebaseCustomClient {
    constructor() {}

    public async saveNewVideo(dto: SaveNewVideoDTO) {
        const newVid: VideoScheme = {
            ...dto,
        };
        const docRef = await addDoc(collection(db, "videos"), newVid);
    }

    public async getLastVideos(dto: GetLastVideosDTO) {
        const videosRef = collection(db, "videos");
        const q = query(videosRef, orderBy("timestamp", "desc"), limit(dto.limit));
        const querySnapshot = await getDocs(q);
        const res: VideoScheme[] = [];
        querySnapshot.forEach((doc) => {
            res.push(doc.data() as VideoScheme);
        });
        return res;
    }

    public async getVideoInfo(blobId: string) {
        const videoCollection = collection(db, "videos");

        try {
            const videoQuery = query(videoCollection, where("blobId", "==", blobId));
            const videoSnapshot = await getDocs(videoQuery);

            if (videoSnapshot.empty) {
                message.error("Clip not found");
                return;
            }

            const videoData = videoSnapshot.docs[0].data() as VideoScheme;
            const videoTimestamp = videoData.timestamp;

            const previousVideoQuery = query(
                videoCollection,
                orderBy("timestamp", "desc"),
                where("timestamp", "<", videoTimestamp),
                limit(1)
            );
            const previousVideoSnapshot = await getDocs(previousVideoQuery);
            const previousVideo = !previousVideoSnapshot.empty
                ? (previousVideoSnapshot.docs[0].data() as VideoScheme)
                : null;

            const nextVideoQuery = query(
                videoCollection,
                orderBy("timestamp", "asc"),
                where("timestamp", ">", videoTimestamp),
                limit(1)
            );
            const nextVideoSnapshot = await getDocs(nextVideoQuery);
            const nextVideo = !nextVideoSnapshot.empty
                ? (nextVideoSnapshot.docs[0].data() as VideoScheme)
                : null;

            return {
                currentVideo: videoData,
                previousVideo,
                nextVideo,
            };
        } catch (error) {
            message.error("Error fetching clip");
        }
    }
}
export const firebaseCustomClient = new FirebaseCustomClient();
