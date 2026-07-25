import { createContext, useEffect, useRef, useState } from "react";

export const HomeContext = createContext()


export const HomeProvider = ({ children }) => {

    const [loading, setLoading] = useState(false)
    const [allSongs, setAllSongs] = useState([])
    const [song, setSong] = useState({
        url: 'https://ik.imagekit.io/18kjj0yy3/songs/Be_Happy_-_Motivational_Nasheed_-_Othman_Al_Ibrahimmp3_9iPwQ5GW7',
        coverImage: 'https://ik.imagekit.io/18kjj0yy3/songs/nasheedDefaultPoster.jpg',
        title: 'Be Happy - Motivational Nasheed - Othman Al Ibrahim',
        mood: "Happy"
    })

    const [isPlaying, setIsPlaying] = useState(false);

    const audioRef = useRef(new Audio());


    const [currentSong, setCurrentSong] = useState(null);


    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        const audio = audioRef.current;

        const update = () => {
            setCurrentTime(audio.currentTime);
            setDuration(audio.duration || 0);
        };

        const handleEnded = () => {
            setIsPlaying(false);
        };

        audio.addEventListener("timeupdate", update);
        audio.addEventListener("loadedmetadata", update);
        audio.addEventListener("ended", handleEnded);

        return () => {
            audio.removeEventListener("timeupdate", update);
            audio.removeEventListener("loadedmetadata", update);
            audio.removeEventListener("ended", handleEnded);
        };
    }, []);
    return (<HomeContext.Provider value={{
        loading,
        setLoading,

        song,
        setSong,

        allSongs,
        setAllSongs,

        audioRef,

        currentSong,
        setCurrentSong,

        isPlaying,
        setIsPlaying,

        currentTime,
        setCurrentTime,

        duration,
        setDuration,
    }}>
        {children}
    </HomeContext.Provider>)
}