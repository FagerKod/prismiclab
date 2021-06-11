import React from "react"
import Header from "./Header"
import Footer from "./Footer"
import "./../styles/reset.css"
import "./../styles/common.css"
import "./../styles/style.css"

const Layout = ({ isHomepage, children, navigation }) => (
  <>
    <Header isHomepage={isHomepage} navigation={navigation} />
    {children}
    <Footer />
    <script
      async
      defer
      src="https://static.cdn.prismic.io/prismic.js?new=true&repo=prismictestskott"
    ></script>
  </>
)

export default Layout
