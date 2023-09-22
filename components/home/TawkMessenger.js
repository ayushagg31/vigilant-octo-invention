import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from "../../store/useAuth";

import TawkMessengerReact from '@tawk.to/tawk-messenger-react';


const TawkMessenger = () => {
    const tawkMessengerRef = useRef();
    const [isTawkLoaded, setIsTawkLoaded] = useState(false)
    const { user } = useAuth((store) => ({
        user: store.user
    }));
    useEffect(() => {
        if (tawkMessengerRef.current == null || user == null || !isTawkLoaded) return

        tawkMessengerRef.current.setAttributes({
            name: user?.displayName || "",
            email: user?.email || "",
        }, function (error) {
            console.log(error)
        })
    }, [isTawkLoaded])

    useEffect(() => {
        if (tawkMessengerRef.current == null || user == null) return
        let isLoaded = tawkMessengerRef.current.onLoaded();
        if (isLoaded) {
            tawkMessengerRef.current.setAttributes({
                name: user?.displayName || "",
                email: user?.email || "",
            }, function (error) {
                console.log(error)
            })
        }
    }, [user?.email])

    const onBeforeLoad = () => {
        console.log('onBeforeLoaded');
    }
    const onLoadHandler = () => {
        setIsTawkLoaded(true);
    }

    return <TawkMessengerReact
        onLoad={onLoadHandler}
        propertyId="650b083e0f2b18434fd9991a"
        widgetId="1haphgdqr"
        ref={tawkMessengerRef}
        onBeforeLoad={onBeforeLoad}
    />
}

export default TawkMessenger