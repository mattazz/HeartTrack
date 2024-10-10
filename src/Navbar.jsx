import { Link } from 'react-router-dom';

function Navbar() {
    const menuItems = ['Home', 'About', 'Login', 'App'];

    return (
        <nav id='main-nav'>
            <ul>
                {menuItems.map((item) => (
                    <li key={item}>
                        <Link to={`/${item.toLowerCase()}`}>{item}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Navbar;