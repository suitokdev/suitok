import { useCallback, useEffect } from "react";

interface UseMouseScrollProps {
    onScrollDown?: () => void;
    onScrollUp?: () => void;
}

export const useMouseScroll = ({ onScrollDown, onScrollUp }: UseMouseScrollProps) => {
    const handleWheel = useCallback(
        (e: WheelEvent) => {
            if (e.deltaY > 0) {
                onScrollDown?.();
            } else {
                onScrollUp?.();
            }
        },
        [onScrollDown, onScrollUp]
    );

    useEffect(() => {
        document.addEventListener("wheel", handleWheel);
        return () => {
            document.removeEventListener("wheel", handleWheel);
        };
    }, [handleWheel]);
};
