import ReactPlayer from "react-player";
import { getVideoUrlByBlobId } from "../../../helpers/getVideoUrlByBlobId";
import style from "./VideoCard.module.sass";
import { Link } from "react-router-dom";
import { Loader } from "../../loader";
import { useRef, useState } from "react";
import BaseReactPlayer from "react-player/base";

interface VideoCardProps {
    blobId: string;
    name?: string;
}

export const VideoCard = ({ blobId, name }: VideoCardProps) => {
    const [loading, setLoading] = useState(true);
    const [hovered, setHovered] = useState(false);
    const playerRef = useRef(null);
    const leaveHover = () => {
        setHovered(false);
        if (playerRef.current) (playerRef.current as BaseReactPlayer<any>).seekTo(0);
    };
    return (
        <div
            className={style.videoCard}
            onMouseOver={() => setHovered(true)}
            onMouseOut={leaveHover}
        >
            <Link to={"/video/" + blobId}>
                <div className={style.playerWrapper}>
                    <ReactPlayer
                        ref={playerRef}
                        className="react-player"
                        url={getVideoUrlByBlobId(blobId)}
                        width="100%"
                        height="100%"
                        controls={false}
                        playing={hovered && !loading}
                        loop
                        playIcon={<></>}
                        muted
                        onReady={() => setLoading(false)}
                    />
                    <div className={style.loader}>{loading ? <Loader /> : null}</div>
                    <div className={style.title}>{name}</div>
                </div>
            </Link>
        </div>
    );
};
