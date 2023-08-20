import React from "react";
import { Route } from "react-router-dom";
import routes from "../resources/routes";
import UnAuthGuard from "../guards/UnAuthGuard";
import Login from "../components/login/Login";
import Register from "../components/login/Register";

const UnAuthRoutes = [
    <Route key="Login" path={routes.LOGIN} element={<UnAuthGuard component={<Login />} />} ></Route>,
    <Route key="Register" path={routes.REGISTER} element={<UnAuthGuard component={<Register />} />} > </Route>
]

export default UnAuthRoutes;