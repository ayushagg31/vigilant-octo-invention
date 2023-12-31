("use client");
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import { useAuth } from '../../store/useAuth';


const withAuthRedirect = (Component) => {

    return (props) => {
        const [isMounted, setMounted] = useState(false);
        const { user, loadingUser } = useAuth((store) => ({
            user: store.user,
            loadingUser: store.loadingUser,
        }));
        useEffect(() => {
            setMounted(true);
        }, []);

        const router = useRouter();
        useEffect(() => {
            if (!loadingUser && user == null) {
                router.push("/");
            }
        }, [user, loadingUser])
        if (!isMounted || loadingUser) return <></>
        // Otherwise, render the component
        return user && <Component {...props} />;
    };
};

export default withAuthRedirect;