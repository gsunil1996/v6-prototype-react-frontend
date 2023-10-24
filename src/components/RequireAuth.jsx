import { useLocation, Navigate, Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../redux/features/auth/authSlice";

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation()
  const { roles } = useAuth();
  const token = useSelector(selectCurrentToken)

  const content = (
    roles.some(role => allowedRoles?.includes(role))
      ? <Outlet />
      : token
        ? <Navigate to="/unauthorized" state={{ from: location }} replace />
        : <Navigate to="/auth/signin" state={{ from: location }} replace />
  )

  return content
}
export default RequireAuth