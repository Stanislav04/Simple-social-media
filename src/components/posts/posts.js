import "./posts.css"
import { useState, useEffect } from "react"
import Header from "../header/header"
import Post from "../post/post"

export default function Posts({ currentUser, setCurrentUser }) {
    const [posts, setPosts] = useState([])
    const [expanded, setExpanded] = useState(false)

    useEffect(() => {
        fetch("http://127.0.0.1:3000/posts", { credentials: "include" })
            .then((response) => response.json())
            .then(posts => {
                if (posts) setPosts(posts)
            })
    }, [])

    const logout = async () => {
        const response = await fetch("http://127.0.0.1:3000/logout", {
            method: "POST",
            credentials: "include"
        })
        setCurrentUser(!response.ok)
    }

    const createPost = async (event) => {
        event.preventDefault()

        const content = event.target.content.value.trim()
        if (!content) return

        const response = await fetch("http://127.0.0.1:3000/posts", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({ content })
        })
        if (response.ok) {
            const post = await response.json()
            setPosts([...posts, { ...post, likes: 0, userName: currentUser }])
        }
        event.target.reset()
        setExpanded(false)
    }

    return (
        <div>
            <Header onClick={logout} />
            <main className="posts">
                {
                    posts.map(post => {
                        return <Post key={post.id} post={post} posts={posts} setPosts={setPosts} currentUser={currentUser} />
                    })
                }
                <aside className="new-post">
                    {
                        !expanded
                            ? <button className="btn | new-post__btn" onClick={() => setExpanded(true)}>+</button>
                            : <form onSubmit={createPost}>
                                <fieldset className="new-post__fieldset">
                                    <legend className="new-post__legend">New Post</legend>
                                    <p className="post__author">{currentUser}</p>
                                    <textarea className="new-post__content" name="content" id="content" cols="40" rows="20" placeholder="Enter your post"></textarea>
                                    <div className="new-post__buttons">
                                        <button className="btn" type="reset">Clear</button>
                                        <button className="btn | new-post__submit">Post</button>
                                        <button className="btn" onClick={() => setExpanded(false)}>Close</button>
                                    </div>
                                </fieldset>
                            </form>
                    }
                </aside>
            </main>
        </div>
    )
}