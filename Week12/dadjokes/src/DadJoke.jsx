import React from "react";

function DadJoke({ joke, index, toggleJoke}) {
    return (
        <div 
            className= {"joke " + (joke.open ? 'open' : '')}
            key={index}
            onClick={() => toggleJoke(index)}
        >
            <div className="joke-question">
                {joke.question}
            </div>
            <div className="joke-answer">
                {joke.answer}
            </div>
        </div>
    );
}

export default DadJoke;
