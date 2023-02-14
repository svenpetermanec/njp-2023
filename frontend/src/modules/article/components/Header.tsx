import { Link, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const Header = () => {
    const navigate = useNavigate();

    const onClick = () => {
        localStorage.removeItem('jwt');
        navigate('/login');
    };

    const token: any = jwt_decode(localStorage.getItem('jwt')!);

    return (
        <div className="flex w-full bg-teal-500 p-2 text-white justify-between h-1/">
            <Link to="/">LOGO</Link>
            <div className="flex w-full justify-evenly">
                <Link to="/category/sport">Sport</Link>
                <Link to="/category/market">Market</Link>
                <Link to="/category/politics">Politics</Link>
                <Link to="/article/new">New Article</Link>
                {token.user.isAdmin === 1 && (
                    <Link to="/category/new">New Category</Link>
                )}
            </div>
            <button onClick={onClick}>Logout</button>
        </div>
    );
};
export default Header;
