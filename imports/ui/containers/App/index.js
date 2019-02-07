import React, { Component } from 'react';
import './styles.css';
import AccountsUIWrapper from "../../components/AccountsWrapper";

class App extends Component {

render() {

    return (
      <div className="app-wrapper">
        <div className="login-wrapper">
          <AccountsUIWrapper />
        </div>
        <p>Welcome to Food Buddy</p>
    </div>
    );   
}
}

export default App;
