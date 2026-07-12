import React from 'react'
import { useContext } from 'react'
import { PostContext } from '../post.context.jsx'
import { createPost, deleteSavedPost, getFeed, getSavedPosts, likePost, savePost, unLikePost } from '../service/postApi.js'


const usePost = () => {
  const context = useContext(PostContext)

  const { loading, setLoading, feed, setFeed, post, setPost, likeLoading, setLikeLoading,savedPostFeed,setSavedPostFeed } = context

  const handleGetFeed = async () => {
    setLoading(true)
    const data = await getFeed()
    console.log("feed data", data)
    setFeed(data.feedPosts.reverse())
    setLoading(false)
  }



  const handleToggleLike = async (postid) => {

    const currentPost = feed.find(post => post._id === postid)
    if (!currentPost) return


    const previousLiked = currentPost.isLiked;

    setFeed(prev =>
      prev.map(post =>
        post._id === postid
          ? {
            ...post,
            isLiked: !post.isLiked
          }
          : post
      )
    )

    try {
      if (previousLiked) {

        await unLikePost(postid)

      } else {

        await likePost(postid)

      }

    } catch (error) {

      setFeed(prev =>
        prev.map(post =>
          post._id === postid
            ? {
              ...post,
              isLiked: previousLiked
            }
            : post
        )
      )
    }

  }

  const handleToggleSavePost = async (postid) => {

    const currentPost = feed.find(post => post._id === postid);

    if (!currentPost) return;

    const previousSaveStatus = currentPost.isSaved;

    // Optimistically update UI
    setFeed(prev =>
      prev.map(post =>
        post._id === postid
          ? {
            ...post,
            isSaved: !post.isSaved
          }
          : post
      )
    );

    try {

      if (previousSaveStatus) {
        await deleteSavedPost(postid);
      } else {
        await savePost(postid);
      }

    } catch (error) {

      // Roll back if API fails
      setFeed(prev =>
        prev.map(post =>
          post._id === postid
            ? {
              ...post,
              isSaved: previousSaveStatus
            }
            : post
        )
      );

      console.log(error);
    }
  };

  const handleCreatePost = async (imageFile, caption) => {

    setLoading(true)
    const data = await createPost(imageFile, caption)
    setFeed([data.post, ...feed])

    setLoading(false)
  }


  const handleGetSavedPosts = async()=>{

    setLoading(true)
    const response = await getSavedPosts()
   

    setSavedPostFeed(response.posts)
    console.log('saved Feed service',response)
    setLoading(false)

    return response.posts


  }

  return { handleGetFeed, feed, loading, handleToggleLike, handleToggleSavePost, handleCreatePost,savedPostFeed,handleGetSavedPosts }
}

export default usePost
