import Movies from './Movies.jsx';
import Events from './Events.jsx';
import Signin from './Signin.jsx';
import AppRoutes from './AppRoutes.jsx';

function Main({currentPage}) {
    return (
        < >
            {/* {currentPage === 'default' && (<h2>Main content under construction</h2>)}
            {currentPage === 'Movies' && (<Movies />)}
            {currentPage === 'Events' && (<Events />)}
            {currentPage === 'Signin' && (<Signin />)} */}
            <AppRoutes />
        </>
    );
}

export default Main;
