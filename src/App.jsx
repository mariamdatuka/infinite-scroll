import Getallusers from "./Pages/Getallusers"
import { GlobalStyles } from "./GlobalStyles"
import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import GetSingleUser from "./Pages/GetSingleUser"
import ClickedUsers from './ClickedUsers'


function App() {

  
  const router=createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<Getallusers/>}/>
        <Route path='/singleuser/:id' element={<GetSingleUser/>}/>
      </>
    )
   )

  return (
    <>
    <ClickedUsers>
      <>
      <RouterProvider router={router}/>
      <GlobalStyles/>
      </>  
  </ClickedUsers>
    
    </>
  )
}

export default App
