import { useLocation } from 'react-router-dom';
import NavBar from "./NavBar"

export default function Layout({children}) {
    const location = useLocation();
    return (
        <div>
            <NavBar path={location.pathname} />
            <div>
                {children}
            </div>
        </div>
    )
}