import { Routes, Route } from "react-router"
import Home from "./Home.jsx";
import Movies from "./Movies.jsx";
import Events from "./Events.jsx";
import Streams from "./Streams.jsx";
import Theatres from "./Theatres.jsx";
import Signup from "./Signup.jsx";
import OTPVerify from "./OTPVerify.jsx";

function AppRoutes() {
    return (
        < >
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/movies' element={<Movies />} />
                <Route path='/events' element={<Events />} />
                <Route path='/streams' element={<Streams />} />
                <Route path='/theatres' element={<Theatres />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/otpverify' element={<OTPVerify />} />
            </Routes>
        </>
    )
}

export default AppRoutes;