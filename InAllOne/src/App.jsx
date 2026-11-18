import { Route, Routes,useLocation} from "react-router-dom"
import Signup from "./component/signup"
import Login from "./component/Login"
import Dashboard from "./component/dashboard"
import Category from "./component/Category"
import Content from "./component/Content"
import Categories from "./component/Categories"
import Filter from "./component/Filter"

function App() {
const location = useLocation();
const hide = location.pathname === '/dashboard' || location.pathname === '/content' || location.pathname.startsWith('/category/');

  return (
    <>
    {hide && <Category/>}
    <Routes>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/dashboard" element={<Dashboard/>}></Route>
      <Route path="/content" element={<Content/>}></Route>
      <Route path="/category/:name" element={<Categories/>}></Route>
      <Route path="/filter" element={<Filter/>}></Route>
    </Routes>
     </> 
  )
}

export default App
