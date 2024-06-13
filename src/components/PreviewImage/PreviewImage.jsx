import React, { useEffect, useRef, useState } from "react";
import ProfileDefault from "../../assets/img/gifs/default_profile.gif";
import { MdClose } from "react-icons/md";

import styles from './style.module.css'

const PreviewImage = ({getValue}) => {
  const [image, setImage] = useState(null);
  const imageRef = useRef(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const img = e.target.files[0];
      const urlObject = URL.createObjectURL(img);
      setImage({
        img,
        urlObject,
      });
    }
  }

  return (
    <div className="mx-auto">
      {
        image ? (
          <div className="position-relative">
            <MdClose
              onClick={() => {
                setImage(null);
                imageRef.current.value = null;
              }}
              className={styles.close_picture}
            />
          <img src={image.urlObject} className="d-block rounded-circle object-fit-cover mx-auto" style={{width:200, height:200}} alt="preview" />
        </div>
        ) : (
          <img src={ProfileDefault} className="d-block rounded-circle object-fit-fill mx-auto" style={{width:200, height:200}} alt="default profile" />
        )
      }

      <div
        className="postShare_option"
        style={{ color: "var(--photo)" }}
        onClick={() => imageRef.current.click()}
      >
        <div style={{ display: "none" }}>
          <input
            type="file"
            name="myImage"
            ref={imageRef}
            accept='image/*'
            // {...register("myImage",{
            //   required:false,
            //   onChange: (e)=>handleImageChange(e)
            // })}
            onChange={handleImageChange}
          />
        </div>
        <button className="button_util py-2 px-3" type="button">
          {
            !image ? 
            'Agrega una foto':
            'Cambia tu foto de perfil'
          }
        </button>
      </div>
    </div>
  );
};

export default PreviewImage;
