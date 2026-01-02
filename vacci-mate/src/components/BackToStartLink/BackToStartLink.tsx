import { Link } from 'react-router';
import './BackToStartLink.scss';

export const BackToStartLink = () => {
    return (
        <>
            <Link to='/' className='back-link'>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#311811"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
                Tillbaka till start
                </Link>
        </>
    );
};