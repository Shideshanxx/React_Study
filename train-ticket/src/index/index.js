import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
// normalize.css会尽量帮我们统一浏览器的默认样式，减少我们适配浏览器的工作量(npm install normalize.css --save 来安装)
import "normalize.css/normalize.css";
import * as serviceWorker from "../serviceWorker";

import store from "./store";
import "./index.css";
import App from "./App.jsx";

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
  document.getElementById("root")
);

if ("production" === process.env.NODE_ENV) {
  serviceWorker.register();
} else {
  serviceWorker.unregister();
}
