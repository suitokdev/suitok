import { FC } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import s from './index.module.sass'

interface MdViewProps {
    md: string;
}

export const MdView: FC<MdViewProps> = ({ md }) => {
    return (
        <Markdown
        className={s.mdview}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
        >
            {md?.replace(/\\n/gi, "\n")}
        </Markdown>
    );
};
