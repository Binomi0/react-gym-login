import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import firebase from 'firebase';


firebase.initializeApp({
    apiKey: "AIzaSyB0MDgH4a2jCcmpnLwXQ_33NecdrvKJDdI",
    authDomain: "gymnoray-caaca.firebaseapp.com",
    databaseURL: "https://gymnoray-caaca.firebaseio.com",
    projectId: "gymnoray-caaca",
    storageBucket: "gymnoray-caaca.appspot.com",
    messagingSenderId: "1078479779075"
})


ReactDOM.render(
    <App />,
    document.getElementById('clase')
);
