// "use client"
import React from "react"
import {BrowserRouter, Link, NavLink, Route, Routes} from "react-router-dom"
import "./App.css"
import {Layout} from "./modules/Layout"
import {UserList} from "./modules/User/UserList"
import {UserForm} from "./modules/User/UserForm"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<UserList />} />
            <Route path="/add" element={<UserForm />} />
            <Route path="/edit/:id" element={<UserForm isEditForm={true} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App
