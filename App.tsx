import React, { useState, useReducer } from "react";
import { RootState, persistor, store, useAppSelector } from "./src/store";
import { Provider } from "react-redux";
import Root from "./src/navigation/Root";
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Root />
      </PersistGate>
    </Provider>
  );
}

// const styles = StyleSheet.create({

// });
