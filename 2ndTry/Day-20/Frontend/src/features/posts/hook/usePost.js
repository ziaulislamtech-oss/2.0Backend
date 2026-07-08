import React from 'react'
import { useContext } from 'react'
import { PostContext } from '../post.context.jsx'
import { getFeed } from '../service/postApi.js'

const usePost = () => {
    const context  = useContext(PostContext)

    const {loading,setLoading,feed,setFeed,post,setPost} = context

    const handleGetFeed = async()=>{
      setLoading(true)
      const data = await getFeed()
      setFeed(data.feedPosts)
      setLoading(false)
    }

  return {handleGetFeed,feed,loading}
}

export default usePost
