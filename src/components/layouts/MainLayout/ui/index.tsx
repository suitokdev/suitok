import { FC, ReactNode, useEffect, useState } from "react";
import s from "./MainLayout.module.sass";
import { Header } from "./components/header";
import { Sidebar } from "./components/sidebar";
import { useMediaQuery } from "react-responsive";
import { useLocation } from "react-router-dom";
import { useSwipeable } from "react-swipeable";

interface MainLayoutProps {
    children: ReactNode;
}

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
    const location = useLocation();
    const [showBar, setShowBar] = useState(false);
    const isTablet = useMediaQuery({ query: "(max-width: 1200px)" });
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

    const handlers = useSwipeable({
        onSwipedLeft: () => setShowBar(false),
        onSwipedRight: () => setShowBar(true),
        delta: 100
    });

    const onMenuClick = () => setShowBar(!showBar);

    useEffect(() => {
        if (isMobile) setShowBar(false);
    }, [location.pathname]);

    return (
        <div className={s.mainLayout} {...handlers}>
            <Header onMenuClick={isTablet ? onMenuClick : undefined} />
            <div className={s.content}>
                <Sidebar hide={isTablet && !showBar} />
                <main>{children}</main>
            </div>
        </div>
    );
};
