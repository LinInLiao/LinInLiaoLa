import React, { Component } from 'react';
// import { Link } from 'react-router';

export default class Home extends Component {
  render() {
    // require the logo image both from client and server
    const styles = require('./Home.scss');
    // const logoImage = require('./logo.svg');
    return (
      <div className={styles.home}>
        <div className={styles.masthead}>
          <div className="container">
            <div className={styles.logo}>
            </div>
            <h1>喝飲料啦</h1>
          </div>
        </div>

        <div className="container">
        </div>
      </div>
    );
  }
}
