import React, { useState } from "react";
import DadJoke from "./DadJoke";
import Header from "./Header";

function App() {
    const [jokes, setJokes] = useState([
        {
            question: "How many programmers does it take to screw in a lightbulb?",
            answer: "None, programmers don't fix hardware issues.",
            open: false,
        },
        {
            question: "You've heard of Murphy's law, right? Do you know Cole's law?",
            answer: "Thinly sliced cabbage and mayo.",
            open: false,
        },
        {
            question: "I like to tell dad jokes.",
            answer: "He really appreciates it when I do.",
            open: false,
        },
    ]);

    const toggleJoke = (index) => {
        setJokes(jokes.map((joke, i) => {
            if (i === index) {
                joke.open = !joke.open
            } else {
                joke.open = false
            }

            return joke
        }))
    }

    return (
        <>
            <Header />
            <div className="jokes">
                {jokes.map((joke, i) => (
                    <DadJoke joke={joke} index={i} toggleJoke={toggleJoke} />
                ))}
            </div>
        </>
    );
}

export default App;
