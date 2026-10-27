import Movies from './Movies.jsx';
import Events from './Events.jsx';
import Signup from './Signup.jsx';
import AppRoutes from './AppRoutes.jsx';

function Main({currentPage}) {
    return (
        < >
            {/* {currentPage === 'default' && (<h2>Main content under construction</h2>)}
            {currentPage === 'Movies' && (<Movies />)}
            {currentPage === 'Events' && (<Events />)}
            {currentPage === 'Signup' && (<Signup />)} */}
            <AppRoutes />
        </>
    );
}

export default Main;
