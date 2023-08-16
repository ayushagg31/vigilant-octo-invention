import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import {auth,provider} from '../../config/googleAuth.config';
import {signInWithPopup} from "firebase/auth";

function GoogleSignIn(){
    const [value,setValue] = useState<string|null>("")
    const handleClick =()=>{
        signInWithPopup(auth,provider).then((data)=>{
            setValue(data?.user?.email)
        })
    }

    useEffect(()=>{
        let userEmail = value || "";
        console.log(userEmail);
        localStorage.setItem("email",userEmail)
    },[value])

    useEffect(()=>{
        setValue(localStorage.getItem('email'))
    })

return (
    <div>
        {value?<p>Hi, {value}</p>:
        <button className="button is-rounded" onClick={handleClick}>Signin With Google</button>
        }
    </div>
);
}
export default GoogleSignIn;