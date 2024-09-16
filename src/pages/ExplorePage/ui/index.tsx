import { useQuery } from "react-query";
import s from "./ExplorePage.module.sass";
import { firebaseCustomClient } from "../../../api/firebase";
import { VideoCard } from "../../../components/videoCard";
import { Loader } from "../../../components/loader";

export const ExplorePage = () => {
    const { data, isFetching } = useQuery({
        queryKey: "videos",
        queryFn: async () => {
            return await firebaseCustomClient.getLastVideos({ limit: 10 });
        },
        refetchOnWindowFocus: false,
    });
    return (
        <div className={s.explorePage}>
            {isFetching ? <Loader /> : null}
            <div className={s.wrapper}>
                {data && data.length > 0
                    ? data.map((video) => (
                          <VideoCard
                              key={video.blobId + video.name}
                              blobId={video.blobId}
                              name={video.name}
                          />
                      ))
                    : null}
            </div>
        </div>
    );
};
