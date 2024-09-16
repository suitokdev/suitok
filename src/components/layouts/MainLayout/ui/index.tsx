import { FC, ReactNode } from "react";
import s from "./MainLayout.module.sass";
import { Header } from "./components/header";
import { Sidebar } from "./components/sidebar";

interface MainLayoutProps {
    children: ReactNode;
}

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className={s.mainLayout}>
            <Header />
            <div className={s.content}>
                <Sidebar />
                <main>{children}</main>
            </div>
        </div>
    );
};
