import s from "./Header.module.sass";
import { useNavigate } from "react-router-dom";
import { Input } from "antd";
import type { GetProps } from "antd";
import { FC, useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

interface HeaderProps {
    onMenuClick?: () => void;
}

export const Header: FC<HeaderProps> = ({ onMenuClick }) => {
    const [search, setSearch] = useState("");
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

    const navigate = useNavigate();
    const validateId = (value: string): boolean => !!value;
    const changeHandler = (value: string) => setSearch(value);
    const onSearch: SearchProps["onSearch"] = (value) => {
        const isValid = validateId(value);
        if (isValid) {
            navigate("/video/" + value);
            setSearch("");
        } else return;
    };

    return (
        <div className={s.header}>
            <div className={s.wrapper}>
                {!isMobile && <div className={s.logo}></div>}
                <div className={s.search}>
                    <Search
                        placeholder="Search video by blob ID"
                        allowClear
                        onSearch={onSearch}
                        style={{ width: "100%" }}
                        value={search}
                        onChange={(e) => changeHandler(e.target.value)}
                    />
                </div>
                <div className={s.other}>
                    {!!onMenuClick && <MenuOutlined onClick={onMenuClick} className={s.menuBtn} />}
                </div>
            </div>
        </div>
    );
};
