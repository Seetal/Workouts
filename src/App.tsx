import Layout from "./components/Base/Layout/Layout"
import { Outlet } from "react-router-dom"

function App() {

  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

export default App
