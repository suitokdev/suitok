import { FC } from "react";
import s from "./Sidebar.module.sass";
import { Link } from "react-router-dom";
import {
    CompassOutlined,
    MailOutlined,
    QuestionCircleOutlined,
    UploadOutlined,
    VideoCameraOutlined,
    XOutlined,
} from "@ant-design/icons";
import { TelegramIcon } from "../../../../../../icons";

export const Sidebar: FC = () => {
    return (
        <aside>
            <nav className={s.wrapper}>
                <Link to="/explore" className={s.link}>
                    <CompassOutlined width={32} height={32} />
                    <span className={s.text}>Explore</span>
                </Link>
                <Link to="/upload" className={s.link}>
                    <UploadOutlined width={32} height={32} />
                    <span className={s.text}>Upload</span>
                </Link>
                <Link to="/video/r0jOslMjQERyUFuYi8cgRB7N_xAg0UevOaUa2S1du2I" className={s.link}>
                    <VideoCameraOutlined width={32} height={32} />
                    <span className={s.text}>Demo</span>
                </Link>
                <Link to="/about" className={s.link}>
                    <QuestionCircleOutlined />
                    <span className={s.text}>About</span>
                </Link>
            </nav>
            <div className={s.wrapper}>
                <Link to="https://x.com/Suitokofficial" className={s.link}>
                    <XOutlined width={32} height={32} />
                    <span className={s.text}>X (Twitter)</span>
                </Link>
                <Link to="https://t.me/suitok" className={s.link}>
                    <TelegramIcon className={s.svg} />
                    <span className={s.text}>Telegram</span>
                </Link>
                <Link to="mailto:suitok.dev@gmail.com" className={s.link}>
                    <MailOutlined width={32} height={32} />
                    <span className={s.text}>Support</span>
                </Link>
            </div>
        </aside>
    );
};
