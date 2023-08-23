import { createApp } from "vue";
import { plugin, defaultConfig } from "@formkit/vue";
import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import config from "../formkit.config";

const app = createApp(App);
app.use(router);
app.use(plugin, defaultConfig(config, { locale: "es" }));

app.mount("#app");
