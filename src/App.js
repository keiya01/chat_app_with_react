import React, { Component } from 'react'
import store from './store'
import { Provider } from 'react-redux'
import AppRoute from './components/AppRoute';
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppRoute/>
      </Provider>
    );
  }
}

export default App;
