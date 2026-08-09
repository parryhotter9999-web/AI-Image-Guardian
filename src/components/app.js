import { HomeScreen } from "../screens/HomeScreen.js";

export function App() {

    console.log("4. App() called");

    const app = document.createElement("div");

    app.id = "application";

    app.appendChild(HomeScreen());

    console.log("5. HomeScreen added");

    return app;
}