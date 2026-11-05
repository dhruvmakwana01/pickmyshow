import { createContext, useState } from "react";

export let UserContext = createContext();
function UserProvider({ children }) {
    const [user, setUser] = useState({
        name: "Guest User",
        email: "Guest@example.com",
        contact: "0000000000",
        role: "Guest"
    });
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
export default UserProvider;