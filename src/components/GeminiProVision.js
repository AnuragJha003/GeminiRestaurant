//image
import React, {useState} from "react";
import {GoogleGenerativeAI} from "@google/generative-ai";
import {getBase64} from '../helper/imageHelper';


const GeminiProVision=()=>{
    const genAI= new GoogleGenerativeAI('AIzaSyC7syWSzKcwTigSKS-1wBescAE8Jn3QTeM')

    const [image,setImage]=useState('');
    const [imageInData,setImageInlineData]=useState('');
    const [airesponse,setResponse]=useState('');
    const [loading,setLoading]=useState(false);

    async function aiImageRun() {
        setLoading(true);
        setResponse('');
        const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
        const result = await model.generateContent([
            "What's in this photo?", imageInData
        ]);
        const response = await result.response;
        const text = response.text();
        setResponse(text);
        setLoading(false);
    }

    const handleClick=()=>{
        aiImageRun();
    }

    const handleImageChange=(e)=>{
        const file=e.target.files[0];
        getBase64(file)
        .then((result)=>{
            setImage(result);
        })
        .catch(e=>console.log(e))

        //generating content model for gemini google ai 
        fileToGenerativePart(file).then((image) => {
            setImageInlineData(image);
        });
    }

    // Converts a File object to a GoogleGenerativeAI.Part object.
    //default function to be used in here 

    async function fileToGenerativePart(file) {
        const base64EncodedDataPromise = new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result.split(',')[1]);
            reader.readAsDataURL(file);
        });

        return {
            inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
        };
    }

    return (
        <div>
            <div>
                <div style={{display:'flex'}}>
                    <input type='file' onChange={(e)=>handleImageChange(e)} />
                    <button style={{marginLeft:'20px'}} onClick={()=>handleClick()}>Search</button>
                </div>
                <img src={image} style={{width:'30%',marginTop:30}} />
            </div>
            {
                loading==true &&
                (airesponse=='')?
                <p style={{margin:'30px'}}>Loading ..</p>
                :
                <div style={{margin:'30px'}}>
                    <p>{airesponse}</p>
                </div>
            }
        </div>
    );
};

export default GeminiProVision;