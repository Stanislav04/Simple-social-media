import "./auth-form.css";

export default function AuthForm({ btnText, onSubmit, onFocus }) {
    return (
        <form className="auth-form" onSubmit={onSubmit} onFocus={onFocus}>
            <input type="text" className="name-input" name="name" placeholder="Enter your username" />
            <button type="submit" className="btn-reverse">{btnText}</button>
        </form>
    )
}