//with text 
import React, {useState} from "react";
import {GoogleGenerativeAI} from "@google/generative-ai";

const GeminiPro =()=>{
    const genAI= new GoogleGenerativeAI('AIzaSyC7syWSzKcwTigSKS-1wBescAE8Jn3QTeM')

    const [search,setSearch]=useState('');
    const [airesponse,setResponse]=useState('');
    const [loading,setLoading]=useState(false);

    async function aiRun() {
        setLoading(true);
        setResponse('');
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `random meals related to ${search} category with images and prices`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        setResponse(text);
        setLoading(false);
    }//default function from the gemini documentation of integration 
    const handleChangeSearch = (e) => {
        setSearch(e.target.value);
    }

    const handleClick = () => {
        aiRun();
    }

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <input placeholder='Search Food with Category using Generative AI' onChange={(e) => handleChangeSearch(e)} />
                <button style={{ marginLeft: '20px' }} onClick={() => handleClick()}>Search</button>
            </div>

            {
                loading == true && (airesponse == '') ?
                    <p style={{ margin: '30px 0' }}>Loading ...</p>
                    :
                    <div style={{ margin: '30px 0' }}>
                        <p>{airesponse}</p>
                    </div>
            }
        </div>
    );
};

export default GeminiPro;