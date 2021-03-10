import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";
/*  import styles here  */
import styles from "./styles.scss";

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);
