import { useRef } from 'react';
import { useState } from 'react';

function Demo2() {
    const usernameref = useRef("");
    const [useremail, setUseremail] = useState("");
    const handleSubmit = () => {
        usernameref.current.focus();
        usernameref.current.style.color = 'yellow';
        console.log(usernameref.current.value);
    };
    return ( 
        <>
        <form>
            Username: <input type="text" ref={usernameref} />
            Email: <input type="email" value={useremail} onChange={(e) => setUseremail(e.target.value)} />
            emailoutput: <h3>{useremail}</h3>
            usernameoutput: <h3>{usernameref.current.value}</h3>
            <button type="button" onClick={handleSubmit}>Submit</button>
        </form>
        </>
    );
}

export default Demo2;