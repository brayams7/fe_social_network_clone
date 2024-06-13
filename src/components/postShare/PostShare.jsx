import React, { useEffect, useRef, useState } from 'react';
import './postShare.css'
import ProfileImage from '../../assets/img/img/profileImg.jpg'
import { MdOutlinePhoto } from "react-icons/md";
import { BiVideo } from "react-icons/bi";
import { GoLocation } from "react-icons/go";
import { FcCalendar } from "react-icons/fc";
import { MdClose } from "react-icons/md";
import { getUserDataCookie } from '../../helpers/authCookies';
import { uploadImage } from '../../services/postServices';
import { useUploadPostMutation } from '../../services/apiSlicePosts';
// import { setDataPosts } from "../../redux/slices/postsSlice";
// import { useDispatch } from 'react-redux';


const PostShare = ({setPage}) => {
    const user = getUserDataCookie()
    // const dispatch = useDispatch()
    const [description, setDescription] = useState("")
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("") 
    const imageRef = useRef(null)
    const [uploadPost, result] = useUploadPostMutation()
    // const [trigger, {data:currentData, isUninitialized}] = useLazyGetPostsQuery()


    const handleImageChange = (e)=>{
        if(e.target.files && e.target.files[0]){
            const img = e.target.files[0]
            const urlObject = URL.createObjectURL(img)
            setImage({
                img,
                urlObject
            })
        }
    }

    // useEffect(()=>{
    //     if(!isUninitialized){
    //         if(currentData && currentData?.code === 200){
    //             console.log({isUninitialized})
    //             dispatch(setDataPosts(currentData.data))
                
    //         }
    //         console.log({isUninitialized})
    //     } 
    // },[isUninitialized, currentData, dispatch]) // eslint-disable-line react-hooks/exhaustive-deps
    
    const handleSubmit = async (e)=>{
        e.preventDefault()
        
        let data = null
        let responseImage = null
        const newPost = {
            userId:user._id,
            desc:description,
            image:""
        }
        if(image){
            data = new FormData()
            const fileName = Date.now() + image.img.name
            data.append("name", fileName)
            data.append("filename", image.img)
        }

        try {
            setLoading(true)

            if(data){
                console.log("entrò")
                responseImage = await uploadImage(data)
            }

            if(responseImage && responseImage.code === 200){
                newPost.image = responseImage.data.url
            }

            if(responseImage && responseImage.code !== 200){
                setError("Error al subir un post, intente mas tarde")
                return
            }

            uploadPost(newPost)
            .then(()=>{
                setPage(1)
                // dispatch(postApiSlice.endpoints.getPosts.initiate({page:1, id:user._id},{forceRefetch:true}))
                // console.log({useQueryPost:useQueryPost.data})
                // postApiSlice.endpoints.getPosts.useQuery()
                // trigger({page:1, id:user._id})
                
            })
            setError("")

            // if(responseImage.code === 200){

                
            //     console.log(newPost)
            //     uploadPost(newPost)
            //     setError("")
            // }else{
            //     setError("Error al subir un post, intente mas tarde")
            // }
            
        } catch (error) {
            console.log(error)
            setError("Ocurrió un error al subir el post, intente mas tarde")
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{

        if(result.isSuccess){
            setImage(null)
            setDescription("")
            imageRef.current.value = null;
        }

        if(result.isError){
            setError("Ocurrió un error al subir el post, intente mas tarde")
        }

    },[result])

    return (
        <div className='postShare_container'>
            <img src={ProfileImage} alt="" />
            <div>
                <input 
                    type="text" 
                    placeholder='Que estás pensando' 
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                />
                <div className="postShare_options">
                    <div 
                        className="postShare_option"
                        style={{color:"var(--photo)"}}
                        onClick={()=>imageRef.current.click()}
                    >
                        <div style={{display:"none"}}>
                            <input 
                                type="file" 
                                name="myImage" 
                                ref={imageRef} 
                                onChange={handleImageChange}
                            />
                        </div>
                        <MdOutlinePhoto/>
                        Foto
                    </div>
                    <div 
                        className="postShare_option"
                        style={{color:"var(--video)"}}
                    >
                        <BiVideo/>
                        Video
                    </div>
                    <div 
                        className="postShare_option"
                        style={{color:"var(--location)"}}
                    >
                        <GoLocation/>
                        Locación
                    </div>
                    <div 
                        className="postShare_option"
                        style={{color:"var(--shedule)"}}
                    >
                        <FcCalendar/>
                        Cronograma
                    </div>

                    <button type='button' className='button_util button_ps'
                        onClick={handleSubmit}
                        disabled={(loading || result.isLoading)}
                    >
                        {
                            (loading || result.isLoading) ? "Subiendo..." : "Compartir"
                        }
                    </button>
                </div>

                {
                    image && (
                        <div className="preview_image">
                            <MdClose onClick={()=>{
                                setImage(null)
                                imageRef.current.value = null;
                                
                                
                            }}/>
                            <img src={image.urlObject} alt="preview" />
                        </div>
                    )
                }

            </div>
            <div>
                {
                    error && error
                }
            </div>
        </div>
    );
};

export default PostShare;