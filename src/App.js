import React, { useEffect } from 'react';
import './App.css';
import { start } from './boxes';

// 'use strict';

// implement logic that checks for distance between cursor and the nearest point
// draw a line between cursor and the nearest point
// mark the distance
// use vanilla js

// BONUS: clicking on the canvas permanently adds a point to the canvas in that location,, a line to the nearest point and the distance between them

function App() {
    useEffect(() => {
        start();
    });
    return (
        <div className="boxes">
            <svg xmlns="http://www.w3.org/2000/svg" height="100%" width="100%">
                {/* <line id="line2" x1="1000" y1="1000" x2="1200" y2="1200" stroke="black" stroke-width="1" /> */}

                <line id="line" x1="0" y1="0" x2="0" y2="0" stroke="black" stroke-width="1" />
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
}

export default App;
// ReactDOM.render(<App />, document.getElementById('root'));
