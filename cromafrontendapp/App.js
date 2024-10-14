import React, { useState } from 'react';
import RootNavigator from './component/uicomponents/RootNavigator';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import RootReducer from "./storege/RootReducer"

var store=createStore(RootReducer)



function App(props){

  return (
    <Provider store={store} >
    <RootNavigator />
    </Provider>
  );
}


export default App;
