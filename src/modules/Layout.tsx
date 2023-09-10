import React from "react"
import Style from "./LayoutStyle.module.css"
import {GlobalNav} from "./GlobalNav"
import {Outlet} from "react-router-dom"
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
        <main>
          <Outlet />
        </main>
        <div>Section</div>
      </section>
    </>
  )
}
