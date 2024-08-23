import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserLayout from "../layout/user-layout";
import HomePage from "../pages/home-page";
import EventsPage from "../pages/events-page";
import CoursesPage from "../pages/courses-page";
import AboutPage from "../pages/about-page";
import ContactPage from "../pages/contact-page";
import LoginPage from "../pages/login-page";
import DashboardPage from "../pages/dashboard/dashboard-page";
import AdminPage from "../pages/dashboard/admin-page";
import PrivateRoute from "./private-route";
import { config } from "../helpers/config";
import Error403 from "../pages/errors/error403"
import Error404 from "../pages/errors/error404"


const router= createBrowserRouter([
    {
        path:"/", // burası bizim route muz. anasayfayı temsil eder
        element: <UserLayout/>, //ve herşey bu UserLayout'un çocugu olacak, bütün sayfalarda userLayout kullanılacak. 
        children: [
            {
                index: true,
                element: <HomePage/>
            },
            {
                path: "courses",
                element: <CoursesPage/>
            },
            {
                path: "events",
                element: <EventsPage/>
            },
            {
                path: "about",
                element:<AboutPage/>
            },
            {
                path: "contact",
                element: <ContactPage/>
            },
            {
                path: "login",
                element: <LoginPage/>
            },
            {
                path:"dashboard",
                children:[{
                    index:true,
                    element:<PrivateRoute roles={config.pageRoles.dashboard}><DashboardPage/></PrivateRoute>
                },
                {
                    path:"admin-management",
                    element:<PrivateRoute roles={config.pageRoles.adminManagement}><AdminPage/></PrivateRoute>
                }
            ]
            },
            {
                path:"unauthorized",
                element:<Error403/>
            },
            {
                path:"*",
                element:<Error404/>
            }

        ] 
    }
]);

const AppRouter = () => { //React uygulamasında yönlendirme (routing) işlemini gerçekleştirmek için kullanılır.
  return (
    <RouterProvider router={router}/> //React Router'ın bir bileşenidir ve uygulamanın yönlendirme mantığını yönetir.
  )
}

export default AppRouter
