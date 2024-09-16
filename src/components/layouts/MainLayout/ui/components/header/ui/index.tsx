import s from "./Header.module.sass";
import { useNavigate } from "react-router-dom";
import { Input } from "antd";
import type { GetProps } from "antd";
import { useState } from "react";

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

export const Header = () => {
    const [search, setSearch] = useState("");

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
                <div className={s.logo}></div>
                <div className={s.search}>
                    <Search
                        placeholder="Search video"
                        allowClear
                        onSearch={onSearch}
                        style={{ width: "100%" }}
                        value={search}
                        onChange={(e) => changeHandler(e.target.value)}
                    />
                </div>
                <div className={s.other}></div>
            </div>
        </div>
    );
};
