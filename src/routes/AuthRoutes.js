import React from "react";
import { Route } from "react-router-dom";
import routes from "../resources/routes";
import AuthGuard from "../guards/AuthGuard";
import Home from "../components/Home";

const AuthRoutes = [
    <Route key="Home" path={routes.HOME} element={<AuthGuard component={<Home />} />} />
]

export default AuthRoutes;