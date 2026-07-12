import {  createContext } from "react";
import { useState } from "react";



export const PostContext  =  createContext()

export const PostContextProvider = ({children})=>{

    const [loading,setLoading] = useState()
    const [likeLoading,setLikeLoading] = useState()
    const [post,setPost] = useState([])
    const [feed,setFeed] = useState([])
    const [savedPostFeed,setSavedPostFeed] = useState([])

    return(
        <PostContext.Provider value={{loading,setLoading,post,setPost,feed,setFeed,likeLoading,setLikeLoading,savedPostFeed,setSavedPostFeed}}>
            {children}
        </PostContext.Provider>
    )
}