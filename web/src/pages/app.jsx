import React from "react"
import { Router } from "@reach/router"

import { Dashboard } from "../components/dashboard"
import Layout from "../components/layout/layout"

const App = () => {
  return (
    <Layout>
      <Router basepath="/app">
        <Dashboard path="/dashboard" />
        {/* <Default path="/" /> */}
      </Router>
    </Layout>
  )
}
export default App
