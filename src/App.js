import React from 'react';
import './App.css';

import Field1 from "./components/Field1";
import Field2 from "./components/Field2";
import Field3 from "./components/Field3";
import Field4 from "./components/Field4";

const App = () => {
    return (
        <div className="App">
            <Field1/>
            <div className="mid">
                <Field4/>
                <Field3/>
            </div>
            <Field2/>
        </div>
    );
}

export default App;
