import { Routes, Route, BrowserRouter } from "react-router-dom";
import  Layout  from "./component/pages/Layout";
import Home from "./component/Home";
import AddList from "./component/list/AddList";
import GetList from "./component/list/GetList";
// import GetAktifity from "./component/aktifitas/GetAktifity";
import AddAktivitas from "./component/aktifitas/AddAktivitas";
// import GetListOld from "./component/list/GetListOld";
import { AuthenticationForm } from "./component/user/Login";


function App() {


  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>} />
          <Route path="/add/:id" element={<AddList/>} />
          <Route path="/:id" element={<GetList/>} />
          {/* <Route path="/get" element={<GetListOld/>} /> */}
          <Route path="/login" element={<AuthenticationForm/>} />
          

          {/* <Route path="/getaktifitas" element={<GetAktifity/>} /> */}
          <Route path="/addaktifitas" element={<AddAktivitas/>} />

          
        </Route>
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
