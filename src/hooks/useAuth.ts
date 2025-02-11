"use client"

import { useEffect, useState } from "react";

export function useAuth(){
    const [user, setUser] = useState(null);

    useEffect(()=>{
        const storedUser = localStorage.getItem("user");
        if(storedUser) setUser(JSON.parse(storedUser));
    },[])

    const logOut = () =>{
        localStorage.removeItem("user");
        setUser(null);
    };

    return {user, logOut};
}