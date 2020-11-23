import React, { useState, useEffect } from "react";
import "./App.css";
import "./config"

console.log(process.env.REACT_APP_API_KEY)
const key = 'OU-AUTH ' + process.env.REACT_APP_API_KEY

function App() {
    const [userData, setUserData] = useState({});
    const quotesUrl = "https://ss6b2ke2ca.execute-api.us-east-1.amazonaws.com/Prod/quotes";

    useEffect(() => {
        getQuotesWithFetch();
    }, []);

    const getQuotesWithFetch = async () => {

        const response = await fetch(quotesUrl, {
            method: 'GET',
            headers: {
                Authorization: key,
            },
        });
        const jsonData = await response.json();
        console.log(response)
        console.log(jsonData)
        console.log(setUserData(jsonData));
    };

    return (
        <div className="App">
            <header className="App-header">
                <h2>GitHub User Data</h2>
            </header>
            <div className="user-container">
            </div>
        </div>
    );
}

export default App;