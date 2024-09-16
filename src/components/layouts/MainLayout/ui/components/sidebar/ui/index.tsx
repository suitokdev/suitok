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
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

interface SidebarProps {
    hide?: boolean;
}

const DEFAULT_WIDTH = "200px";
const MOBILE_WIDTH = "250px";

export const Sidebar: FC<SidebarProps> = ({ hide = false }) => {
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
    const WIDTH = isMobile ? MOBILE_WIDTH : DEFAULT_WIDTH;
    return (
        <motion.aside animate={{ maxWidth: hide ? "0px" : WIDTH, minWidth: hide ? "0px" : WIDTH }}>
            <div className={s.sidebarWrapper}>
                <nav className={s.wrapper}>
                    <Link to="/explore" className={s.link}>
                        <CompassOutlined width={32} height={32} />
                        <span className={s.text}>Explore</span>
                    </Link>
                    <Link to="/upload" className={s.link}>
                        <UploadOutlined width={32} height={32} />
                        <span className={s.text}>Upload</span>
                    </Link>
                    <Link
                        to="/video/AC3B-r1gxfQIqmskbkY-BOhZ8OqXkkKHICgfarDZU3A"
                        className={s.link}
                    >
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
            </div>
        </motion.aside>
    );
};
