import { FC } from "react";
import s from "./Sidebar.module.sass";
import { Link } from "react-router-dom";
import { CompassOutlined, QuestionCircleOutlined, UploadOutlined } from "@ant-design/icons";

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
                <Link to="/about" className={s.link}>
                    <QuestionCircleOutlined />
                    <span className={s.text}>About</span>
                </Link>
            </nav>
        </aside>
    );
};
