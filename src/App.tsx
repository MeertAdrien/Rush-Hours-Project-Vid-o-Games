import { Outlet } from "react-router"
import "./App.css"

function App() {
  return (
    <>
      <header>
        <h2>header</h2>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <h2>footer</h2>
      </footer>
    </>
  )
}

export default App