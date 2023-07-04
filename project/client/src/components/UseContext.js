import { createContext, useState } from "react";


export const userContext = createContext({});

export const addPostModalContext = createContext({});

export const editPostModalWindowProvider = createContext({});

export function UserProvider({children}) {
    const [userState, setUserState] = useState(false);
    return (
        <userContext.Provider value={{userState, setUserState}}>
            {children}
        </userContext.Provider>
    );
};

export function AddPostModalWindowStateProvider({children}) {
    const [modalState, setModalState] = useState(false);
    return (
        <addPostModalContext.Provider value={{modalState, setModalState}}>
            {children}
        </addPostModalContext.Provider>
    )
};
