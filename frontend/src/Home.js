import axios from "axios";
import { useState, useEffect } from "react";

function List() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get("http://localhost:8000/posts");
                setPosts(response.data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
        fetchPosts();
    }, []);

    return (
        <ul>
            {posts.map((post, index) => (
                <li key={index}>{post.title} {post.content}</li>
            ))}
        </ul>
    );
}

export default function Home() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [refresh, setRefresh] = useState(false);

    const submit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://127.0.0.1:8000/posts", { title, content });
            setTitle("");
            setContent("");
            setRefresh(prev => !prev);
        } catch (error) {
            console.error("Error posting data:", error);
        }
    };

    return (
        <div>
            <h1>Test</h1>
            <List key={refresh} />
            <form onSubmit={submit}>
                <label>
                    Titre :
                    <input type="text" name="title" value={title} onChange={e => setTitle(e.target.value)} required />
                </label>
                <label>
                    Contenu :
                    <input type="text" name="content" value={content} onChange={e => setContent(e.target.value)} required />
                </label>
                <button type="submit" onClick={submit}>Submit</button>
            </form>
        </div>
    );
}
