import { useContext, } from "react"
import { getAllSongs, getSong, uploadSong } from "../service/home.api"
import { HomeContext } from "../home.context"
import React from 'react'

const useHome = () => {

    const context = useContext(HomeContext)
    const {

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


    } = context;

    // ======================
    // API Functions
    // ======================


    const handleGetSong = async (mood) => {

        setLoading(true)
        const response = await getSong(mood)
        console.log('useHome : ', response)
        setSong(response.song)
        setLoading(false)

    }

    const handleUploadSong = async (mood) => {


        const response = await uploadSong(mood)
        setAllSongs(prev => [...prev, response.song]);



    }

    const handleGetAllSongs = async () => {

        setLoading(true)
        const response = await getAllSongs()
        setAllSongs(response.songs);
        setLoading(false)


    }

    // ======================
    // Audio Player
    // ======================


    const playSong = (song) => {

        audioRef.current.src = song.url;

        audioRef.current.play();

        setCurrentSong(song);

        setIsPlaying(true);

    };

    const pauseSong = () => {

        audioRef.current.pause();

        setIsPlaying(false);

    };

    const toggleSong = (song) => {

        if (currentSong?._id === song._id) {

            if (isPlaying) {

                pauseSong();

            } else {

                audioRef.current.play();

                setIsPlaying(true);

            }

            return;

        }

        playSong(song);

    };




    // ======================
    // Return
    // ======================

    return {
        // API
        handleGetSong,
        handleUploadSong,
        handleGetAllSongs,

        loading,
        song,
        allSongs,

        // Audio
        currentSong,
        isPlaying,
        currentTime,
        duration,
        audioRef,

        playSong,
        pauseSong,
        toggleSong,
    };
}

export default useHome
