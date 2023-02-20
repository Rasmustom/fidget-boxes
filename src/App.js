import React from 'react';
import './App.css';

// 'use strict';

// implement logic that checks for distance between cursor and the nearest point
// draw a line between cursor and the nearest point
// mark the distance
// use vanilla js

// BONUS: clicking on the canvas permanently adds a point to the canvas in that location,, a line to the nearest point and the distance between them

const App = () => {
    return (
        <div className="boxes">
            <svg xmlns="http://www.w3.org/2000/svg">
                <line id="line" x1="0" y1="0" x2="0" y2="0" stroke="black" />
            </svg>

            {[...new Array(200)].map((_, i) => {
                return (
                    <div className="box">
                        {Math.random() > 0.5 && (
                            <a id={i} href="#">
                                {i}
                            </a>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default App;
// ReactDOM.render(<App />, document.getElementById('root'));
