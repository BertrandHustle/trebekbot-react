import React, {useEffect, useState} from "react";

export default function Timer () {
    const [remainingTime, setRemainingTime] = useState(0);

    useEffect(() => {
        if (remainingTime === 0) return;

        const timer = setInterval(() => {
            setRemainingTime -= 1;
        }, 1000);

        return () => clearInterval(timer);
    }, [remainingTime]);

    return(
        <div>
            <h1>Time: {remainingTime}</h1>
        </div>
    )
}