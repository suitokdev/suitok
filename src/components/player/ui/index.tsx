import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { FC, useState } from "react";
import ReactPlayer from "react-player";
import s from "./Player.module.sass";

interface PlayerProps {
    url: string;
}

export const Player: FC<PlayerProps> = ({ url }) => {
    const [playing, setPlaying] = useState(false);
    return (
        <div className={s.player}>
            <ReactPlayer
                url={url}
                height="100%"
                width="100%"
                loop
                fallback={<Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />}
                style={{
                    objectFit: "contain",
                    backgroundColor: "var(--color-secondary)",
                    borderRadius: 8,
                }}
                onReady={() => setPlaying(true)}
                controls
                playing={playing}
            />
        </div>
    );
};
