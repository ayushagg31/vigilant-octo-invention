import React, { useState, useEffect, useRef } from "react";

function TypeWriter({ data }) {
    const [text, setText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const loopNum = useRef(0);
    const period = 20000;
    const unmounted = useRef(false);

    useEffect(() => {
        const tick = () => {
            if (unmounted.current) {
                return;
            }

            const i = loopNum.current % data.length;
            const fullTxt = data[i];

            let newText = "";
            if (isDeleting) {
                newText = fullTxt.substring(0, text.length - 1);
            } else {
                newText = fullTxt.substring(0, text.length + 1);
            }

            let delta = 200 - Math.random() * 100;

            if (isDeleting) {
                delta /= 2;
            }

            if (!isDeleting && newText === fullTxt) {
                delta = period;
                setIsDeleting(true);
            } else if (isDeleting && newText === "") {
                setIsDeleting(false);
                loopNum.current++;
                delta = 500;
            }

            setText(newText);

            setTimeout(() => {
                tick();
            }, delta);
        };

        unmounted.current = false;
        tick();

        return () => {
            unmounted.current = true;
        };
    }, [data, text, isDeleting]);

    return <span className="typewriter">{text}</span>;
}

export default TypeWriter;
