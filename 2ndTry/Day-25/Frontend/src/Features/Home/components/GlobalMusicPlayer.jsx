import { Play, Pause, Volume2 } from "lucide-react";
import useHome from "../hooks/useHome";

export default function GlobalMusicPlayer() {

    const {

        currentSong,

        isPlaying,

        toggleSong,

        currentTime,

        duration,

        audioRef,

    } = useHome();

    console.log("global Music : ", {
        currentSong,
        isPlaying,
        currentTime,
        duration,
    });
    if (!currentSong) return null;

    const formatTime = (time) => {

        const min = Math.floor(time / 60);

        const sec = Math.floor(time % 60);

        return `${min}:${sec.toString().padStart(2, "0")}`;

    };

    return (

        <div className="fixed bottom-5 left-1/2 z-50 w-[96%] max-w-7xl -translate-x-1/2 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/90 shadow-2xl backdrop-blur-xl">

            
            <div className="flex items-center gap-5 px-6 py-4">

                <img

                    src={currentSong.coverImage}

                    className="h-14 w-14 rounded-lg object-cover shadow-md"

                />

                <div className="min-w-[220px] ">

                    <h3 className="font-space-grotesk text-lg font-bold text-[var(--text)] truncate">

                        {currentSong.title}

                    </h3>

                    <p className="font-manrope text-sm text-[var(--text-muted)] truncate">

                        {currentSong.artist}

                    </p>

                </div>

                <button

                    onClick={() => toggleSong(currentSong)}

                    className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-white transition hover:scale-105"

                >

                    {

                        isPlaying

                            ? <Pause size={22} />

                            : <Play size={22} fill="white" />

                    }

                </button>

                <span className="w-12 text-center font-manrope text-xs text-[var(--text-muted)]">

                    {formatTime(currentTime)}

                </span>

                <input

                    type="range"

                    min={0}

                    max={duration}

                    value={currentTime}

                    onChange={(e) => {

                        audioRef.current.currentTime = e.target.value;

                    }}

                    className="h-2 flex-1 cursor-pointer accent-[var(--primary)]"

                />

                <span className="text-sm">

                    {formatTime(duration)}

                </span>

                <Volume2
                    size={18}
                    className="text-[var(--text-muted)]"
                />

                <input

                    type="range"

                    min={0}

                    max={1}

                    step={0.01}

                    defaultValue={1}

                    onChange={(e) => {

                        audioRef.current.volume = e.target.value;

                    }}

                    className="h-2 w-24 cursor-pointer accent-[var(--primary)]"

                />

            </div>

        </div>

    );

}