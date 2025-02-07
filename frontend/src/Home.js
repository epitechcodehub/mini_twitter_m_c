import axios from "axios"
import { useState } from "react"

export default function Home() {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const submit = (event) => {
        try {
            axios.post("http:://localhost:4000/", {
            title: title,
            content: content,
            });
        } catch(error) {
            console.error("Error : ", error);
        }
    };

    return (
        <body>
            <h1>Test</h1>
            <label>
                Titre :
                <input required="text" name="title" value="" onChange={e => setTitle(e.target.value)} />
            </label>
            <label>
                Content :
                <input required="text" name="content" value="" onChange={e => setContent(e.target.value)} />
            </label>
            <button name="button" onClick={submit}>Submit</button>
        </body>
    )
}