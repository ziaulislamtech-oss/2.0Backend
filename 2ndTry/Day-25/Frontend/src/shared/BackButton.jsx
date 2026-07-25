import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BackButton({
    text = "Back to Home",
    to = "/",
}) {

    const navigate = useNavigate();

    return (

        <button
            type="button"
            onClick={() => navigate(to)}
           className="
fixed
z-[999]

bottom-10
left-1/2
-translate-x-1/2

md:bottom-auto
md:left-auto
md:translate-x-0
md:top-10
md:right-10

group
inline-flex
items-center
gap-3
rounded-2xl
border
border-[var(--border)]
bg-[var(--surface)]
px-5
py-3
font-space-grotesk
font-semibold
text-[var(--text)]
transition-all
duration-300
hover:border-[var(--primary)]
hover:bg-[var(--surface-light)]
hover:shadow-[0_0_25px_rgba(99,102,241,.18)]
"
        >

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15 transition group-hover:bg-violet-500/25">

                <ArrowLeft
                    size={20}
                    className="text-violet-400"
                />

            </div>

            <span>{text}</span>

        </button>

    );
}