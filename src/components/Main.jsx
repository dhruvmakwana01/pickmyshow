import Movies from './Movies.jsx';
import Events from './Events.jsx';

function Main({currentPage}) {
    return (
        < >
            {currentPage === 'default' && (<h2>Main content under construction</h2>)}
            {currentPage === 'Movies' && (<Movies />)}
            {currentPage === 'Events' && (<Events />)}
        </>
    );
}

export default Main;
