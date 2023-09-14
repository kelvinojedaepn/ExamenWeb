import React from "react"
import Style from "./LayoutStyle.module.css"
import {GlobalNav} from "./GlobalNav"
import {Outlet} from "react-router-dom"
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
export const Layout = () => {
  return (
    <>
      <article className={Style.header}>
        <header>
          <h1>CRUD EXAM</h1>
        </header>
      </article>

      <section className={Style["content-section"]}>
        <GlobalNav />
        <main className={Style["main-context"]}>
          <Outlet />
        </main>
      </section>
      <ToastContainer />
    </>
  )
}
