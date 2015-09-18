import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import { createTransitionHook } from 'helpers/universalRouter';

const title = 'LinInLaoLa - 喝啦';
const description = '喝飲料產生器';
const image = '';

const meta = {
  title,
  description,
  meta: {
    charSet: 'utf-8',
    property: {
      'og:site_name': title,
      'og:image': image,
      'og:locale': 'zh_TW',
      'og:title': title,
      'og:description': description,
      'twitter:card': 'summary',
      'twitter:site': '@hinablue',
      'twitter:creator': '@hinablue',
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': image,
      'twitter:image:width': '200',
      'twitter:image:height': '200'
    }
  }
};

@connect(
    () => ({user: null}),
    dispatch => bindActionCreators({}, dispatch))
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  };

  componentWillMount() {
    const {router, store} = this.context;
    this.transitionHook = createTransitionHook(store);
    router.addTransitionHook(this.transitionHook);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.context.router.transitionTo('/loginSuccess');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.context.router.transitionTo('/');
    }
  }

  componentWillUnmount() {
    const {router} = this.context;
    router.removeTransitionHook(this.transitionHook);
  }

  handleLogout(event) {
    event.preventDefault();
    // this.props.logout();
  }

  render() {
    const styles = require('./App.scss');
    return (
      <div className={styles.app}>
        <DocumentMeta {...meta}/>
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container">
            <Link to="/" className="navbar-brand">
              <div className={styles.brand}/>
              {title}
            </Link>

            <ul className="nav navbar-nav">
              <li><Link to="/about">About</Link></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li>
              </li>
            </ul>
          </div>
        </nav>
        <div className={styles.appContent}>
          {this.props.children}
        </div>
        <div className="well text-center">
          Logo and Emoji provided free by <a href="http://emojione.com/">Emoji One</a>
        </div>
      </div>
    );
  }
}
