import "./App.css";
import React, { useEffect, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

const LoginView = React.lazy(() => import("./views/misc/loginView/loginView"));

function App() {
  const [loggedIn, setLoggedIn] = useState("");

  useEffect(() => {
    let savedLoggedIn = localStorage.getItem("li");
    if (savedLoggedIn !== loggedIn) {
      setLoggedIn(savedLoggedIn);
    }
  }, [loggedIn]);

  const setExistLoggedIn = async (isLogged) => {
    if (isLogged !== loggedIn) {
      localStorage.setItem("li", isLogged);
      setLoggedIn(isLogged);
    }
  };

  return (
    <>
      <React.Suspense
        fallback={
          <p className="dark-text" style={{ height: "100vh" }}>
            loading...
          </p>
        }
      >
        <HashRouter>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <LoginView
                  setLogin={(isLogged) => setExistLoggedIn(isLogged)}
                />
              }
            />
          </Routes>
        </HashRouter>
      </React.Suspense>
    </>
  );
}

export default App;
