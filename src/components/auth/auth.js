import "./auth.css"
import { useState } from "react"
import AuthForm from "../auth-form/auth-form"

export default function Auth({ setCurrentUser }) {
    const [newUser, setNewUser] = useState(true)
    const [errorMsg, setErrorMsg] = useState("")

    const register = async (form) => {
        form.preventDefault()

        const username = form.target.name.value.trim()
        if (!username) return

        let response = await fetch("http://127.0.0.1:3000/register", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({ name: username })
        })
        if (!response.ok) {
            setErrorMsg("A user with that name is already registered!")
            return
        }
        login(form)
    }

    const login = async (form) => {
        form.preventDefault()

        const username = form.target.name.value.trim()
        if (!username) return

        let response = await fetch("http://127.0.0.1:3000/login", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({ name: username })
        })
        if (!response.ok) {
            setErrorMsg("No user found with that name!")
            return
        }
        setCurrentUser(username)
        setErrorMsg("")

        form.target.reset()
    }

    return (
        <div className="auth">
            <button className="btn-reverse | switch-btn" onClick={() => setNewUser(!newUser)}>{newUser ? "Login" : "Register"}</button>
            {
                newUser ? <AuthForm btnText="Register" onSubmit={register} onFocus={() => setErrorMsg("")} /> : <AuthForm btnText="Login" onSubmit={login} onFocus={() => setErrorMsg("")} />
            }
            {
                errorMsg ? <p className="error-msg">{errorMsg}</p> : <></>
            }
        </div>
    )
}