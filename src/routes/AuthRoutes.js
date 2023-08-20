import React from "react";
import { Route } from "react-router-dom";
import routes from "../resources/routes";
import AuthGuard from "../guards/AuthGuard";
import Calendari from "../components/Calendari";
import Home from "../components/Home";

/*
const dataToSend = {
    today.year: {
        today.month: {
            today.day: [
                {
                    start: {
                        hour: 10,
                        minute: 0
                    },
                    end: {
                        hour: 11,
                        minute: 0
                    },
                },
                {
                    start: {
                        hour: 11,
                        minute: 0
                    },
                    end: {
                        hour: 12,
                        minute: 0
                    },
                },
            ]
        }
    }
};
*/
const AuthRoutes = [
    <Route key="Home" path={routes.HOME} element={<AuthGuard component={<Home />} />} />
]

export default AuthRoutes;