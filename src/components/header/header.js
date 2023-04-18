import "./header.css";

export default function Header({ onClick }) {
    return (
        <header className="header">
            <h1 className="header__title">Header</h1>
            <button className="btn-reverse | header__logout-btn" onClick={onClick}>Log out</button>
        </header>
    )
}