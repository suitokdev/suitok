import { Navigate, Route, Routes } from "react-router-dom";
import { VideoPage } from "./pages/VideoPage";
import { UploadPage } from "./pages/UploadPage";
import { ExplorePage } from "./pages/ExplorePage";
import { AboutPage } from "./pages/AboutPage";

const Routing = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/explore" replace={true} />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/video" element={<VideoPage />} />
            <Route path="/video/:id" element={<VideoPage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/about" element={<AboutPage />} />
        </Routes>
    );
};

export default Routing;
