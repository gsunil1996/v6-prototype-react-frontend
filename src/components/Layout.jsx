import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./header/Header";
import SideMenu from "./sidebar/SideMenu";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../redux/features/auth/authSlice";
import { useRef } from "react";
import { useRefreshMutation } from "../redux/features/auth/authApiSlice";

export function Layout() {
  const { pathname } = useLocation();
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (pathname.toLowerCase() == "/auth/signin" || pathname.toLowerCase() == "/auth/signup" || pathname.toLowerCase() == "/unauthorized") {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [pathname])

  const token = useSelector(selectCurrentToken)

  const effectRan = useRef(false)

  const [trueSuccess, setTrueSuccess] = useState(false)

  const [refresh] = useRefreshMutation()

  useEffect(() => {

    if (effectRan.current === true || process.env.NODE_ENV !== 'development') { // React 18 Strict Mode

      const verifyRefreshToken = async () => {
        //  console.log('verifying refresh token')
        try {
          //const response = 
          await refresh()
          //const { accessToken } = response.data
          setTrueSuccess(true)
        }
        catch (err) {
          console.error(err)
        }
      }

      if (!token) verifyRefreshToken()
    }

    return () => effectRan.current = true

    // eslint-disable-next-line
  }, [])


  return (
    <>
      {show === true && (
        <div>
          <Header />
        </div>
      )}

      <div style={{ display: show ? "flex" : "block" }}>
        {show === true && (
          <div>
            <SideMenu />
          </div>
        )}
        <div style={{ width: "100%" }} >
          <Outlet />
        </div>
      </div>
    </>
  );
}
