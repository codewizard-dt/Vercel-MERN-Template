import { Link } from "react-router-dom"
import { useAuth } from "../api/auth/context"
import LogoutButton from "../components/auth/LogoutButton"

const Home = () => {
  const authToken = useAuth()
  return (
    <div>
      <h1>Home</h1>
      <h2>Some app info</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci beatae aspernatur quasi eaque soluta ab, accusantium vero ratione expedita, officiis ipsum placeat amet ut molestias aliquam esse minus. Facilis, molestias?</p>
      {authToken ? <>
        <Link to="/dashboard">
          <button>Dashboard</button>
        </Link>
        <LogoutButton />
      </> : <>
        <Link to="/login">
          <button>Login</button>
        </Link>
      </>}

    </div>
  )
}

export default Home