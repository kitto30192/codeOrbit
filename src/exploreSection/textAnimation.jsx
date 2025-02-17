import React, { useEffect, useState } from "react";
import './ani.css';
const AnimatedText = () => {
    const sentenceArray = ["Be", "careful", "with", "what", "you", "know.", "That's", "where", "most", "people's", "troubles", "begin."];

    const [visibleWords, setVisibleWords] = useState(" ");

    useEffect(() => {
        let index = 0;
        const timer = setInterval(() => {
            if (index < sentenceArray.length) {
                setVisibleWords(visibleWords + sentenceArray[index]);
                console.log(visibleWords);
                index++;
            } else {
                clearInterval(timer);
            }
        }, 1000); // 500ms delay between each word
    }, []);

    return (
        <div className="text-center text-2xl font-semibold">
            {sentenceArray.map((word, i) => (
                <span
                    key={i}
                    className="inline-block opacity-0 transform translate-y-5 animate-fadeIn"
                >
                    {visibleWords}{" "}
                </span>
            ))}
        </div>
    );
};

export default AnimatedText;
