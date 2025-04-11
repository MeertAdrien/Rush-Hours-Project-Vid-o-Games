import { Outlet } from "react-router"
import "./App.css"

function App() {
  return (
    <>
      <header>
        <h2>header</h2>
        <ul>
          <li>Home</li>
          <li>Contact</li>
        </ul>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <h2>footer</h2>
        <li>contact</li>
      </footer>
    </>
  )
}

export default App