import { Layout } from "../components/Layout";
import PersistLogin from "../components/PersistLogin";
import RequireAuth from "../components/RequireAuth";
import Home from "../pages/Home";
import PageNotFound from "../pages/PageNotFound";
import Pricing from "../pages/Pricing";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/Signin";
import UnAuthorized from "../pages/UnAuthorized";
import AdminPage from "../pages/admin/AdminPage";
import EditUser from "../pages/admin/EditUser";
import Dashboard from "../pages/creator/Dashboard";
import Pets from "../pages/user/Pets";

export const routes = [
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "unauthorized",
                element: <UnAuthorized />,
            },
            {
                path: "pricing",
                element: <Pricing />,
            },
            {
                path: "auth/signin",
                element: <SignIn />,
            },
            {
                path: "auth/signup",
                element: <SignUp />,
            },
            {
                element: <PersistLogin />,
                children: [
                    {
                        element: <RequireAuth allowedRoles={['Admin']} />,
                        children: [
                            {
                                path: 'admin',
                                element: <AdminPage />,
                            },
                            {
                                path: 'admin/:id',
                                element: <EditUser />,
                            },
                        ],
                    },
                    {
                        element: <RequireAuth allowedRoles={['Admin', 'Creator']} />,
                        children: [
                            {
                                path: 'creator',
                                element: <Dashboard />,
                            },
                        ],
                    },
                    {
                        element: <RequireAuth allowedRoles={['User', 'Creator', 'Admin']} />,
                        children: [
                            {
                                path: 'user',
                                element: <Pets />,
                            },
                        ],
                    },
                ]
            },

        ],
    },
    // Add a 404 handling route with path="*"
    {
        path: "*",
        element: <PageNotFound />,
    },
];
