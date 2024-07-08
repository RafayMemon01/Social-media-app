import { useState } from "react"
import useShowToast from "./useShowToast";

const usePreviewImg = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const maxSize = 2 * 1024 * 1024; //2MB
  const showToast = useShowToast()

  const handleImageChange = (e)=>{
    const file = e.target.files?.[0];
    if(file && file.type.startsWith('image/')){
        if(file.size > maxSize){
            showToast("Error", "Please select a file less than 2MB", "error");
            setSelectedFile(null);
            return;
        }
        const reader = new FileReader();
        reader.onloadend = ()=>{
            setSelectedFile(reader.result);
        }
        reader.readAsDataURL(file);
    }else{
        showToast("Error", "Please select a valid image file","error");
        setSelectedFile(null);
    }
  }
  return {
    selectedFile,
    handleImageChange,
    setSelectedFile
  }
}

export default usePreviewImg
