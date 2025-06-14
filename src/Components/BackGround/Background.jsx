import React, { useState } from "react";
import "./background.css";


const Background = () => {
    function BackgroundChanger() {
        const [isBlue, setIsBlue] = useState(false);

        const toggleColor = () => {
            setIsBlue(!isBlue);
        };

        return (
            <div className={isBlue ? "blue-bg" : "white-bg"}>
                <h1>Change Background</h1>
                <button onClick={toggleColor}>Toggle Background</button>
            </div>
        );
    }

}

export default Background;


