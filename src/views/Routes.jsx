import React from 'react'
import {
    BrowserRouter as Router,
    Routes as Switch,
    Route,
} from "react-router-dom"

import Home from './Home/Home'
import NotFound from "./NotFound/NotFound"
import CentralTrend from './CentralTrend/CentralTrend'

function Routes() {
    return (
        <Router>
            <Switch>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/central-trend" element={<CentralTrend />} />
            </Switch>
        </Router>
    )
}

export default Routes