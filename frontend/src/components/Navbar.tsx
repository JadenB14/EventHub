import { Link } from "react-router-dom";


export default function NavBar() {
    return (
        <div>
            <Link to={"/home"}>
                <h1>Home</h1>
            </Link>
            <Link to={"/profile"}>
                <h1>Profile</h1>
            </Link>
        </div>
    )
}