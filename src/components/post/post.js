import "./post.css";

export default function Post({ currentUser, post, posts, setPosts }) {
    const deletePost = async () => {
        const response = await fetch(`http://127.0.0.1:3000/posts/${post.id}`, {
            method: "DELETE",
            credentials: "include"
        })
        if (response.ok) {
            const updatedPosts = posts.filter(p => p.id !== post.id)
            setPosts(updatedPosts)
        }
    }

    const likePost = async () => {
        const response = await fetch(`http://127.0.0.1:3000/posts/${post.id}/like`, {
            method: "POST",
            credentials: "include"
        })
        if (response.ok) {
            const updatedPosts = posts.map(p => {
                if (p.id === post.id) {
                    p.likes++
                }
                return p
            })
            setPosts(updatedPosts)
        }
    }

    return (
        <section className="post">
            <p className="post__author">{post.userName}</p>
            <p className="post__text">{post.content}</p>
            <p className="post__likes">Likes: {post.likes}</p>
            {
                currentUser === post.userName
                    ? <button className="btn | post__btn post__delete" onClick={deletePost}>Delete</button>
                    : <button className="btn | post__btn post__like" onClick={likePost}>Like</button>
            }
        </section>
    )
}