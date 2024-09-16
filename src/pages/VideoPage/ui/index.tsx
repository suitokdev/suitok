import { useNavigate, useParams } from "react-router-dom";
import s from "./VideoPage.module.sass";
import { Player } from "../../../components/player";
import { DownCircleFilled, UpCircleFilled } from "@ant-design/icons";
import { getVideoUrlByBlobId } from "../../../helpers/getVideoUrlByBlobId";
import { useQuery } from "react-query";
import { firebaseCustomClient } from "../../../api/firebase";
import { Loader } from "../../../components/loader";
import { useSwipeable } from "react-swipeable";
import { useMouseScroll } from "../../../hooks/useMouseScroll";
import { useMediaQuery } from "react-responsive";

export const VideoPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
    const { data, isFetching } = useQuery({
        queryKey: ["video", id],
        queryFn: async () => {
            return await firebaseCustomClient.getVideoInfo(id ?? "");
        },
        enabled: !!id,
        refetchOnWindowFocus: false,
    });

    const url = getVideoUrlByBlobId(id);

    const clickNext = () => (data?.nextVideo ? navigate("/video/" + data?.nextVideo.blobId) : null);
    const clickPrev = () =>
        data?.previousVideo ? navigate("/video/" + data?.previousVideo.blobId) : null;

    const handlers = useSwipeable({
        onSwipedDown: clickPrev,
        onSwipedUp: clickNext,
        delta: 100,
    });
    useMouseScroll({
        onScrollDown: clickPrev,
        onScrollUp: clickNext,
    });

    return (
        <div className={s.wrapper} {...handlers}>
            {isFetching ? (
                <Loader />
            ) : (
                <>
                    <div className={s.playerWrapper}>
                        <Player url={url} />
                        {!isMobile && (
                            <div className={s.navBtns}>
                                {!!data?.nextVideo && (
                                    <UpCircleFilled
                                        className={s.navBtn}
                                        style={{ fontSize: "42px", marginBottom: "12px" }}
                                        onClick={clickNext}
                                    />
                                )}
                                {!!data?.previousVideo && (
                                    <DownCircleFilled
                                        className={s.navBtn}
                                        style={{ fontSize: "42px" }}
                                        onClick={clickPrev}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                    <div className={s.meta}>
                        <p className={s.name}>Name: {data?.currentVideo.name}</p>
                        <p className={s.object}>
                            Object:{" "}
                            <a
                                href={
                                    "https://suiscan.xyz/testnet/object/" +
                                    data?.currentVideo.objectId
                                }
                                target="_blank"
                            >
                                {data?.currentVideo.objectId}
                            </a>
                        </p>
                        <p className={s.blob}>Blob ID: {data?.currentVideo.blobId}</p>
                    </div>
                </>
            )}
        </div>
    );
};
