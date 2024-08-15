import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserLayout from "../layout/user-layout";
import HomePage from "../pages/home-page";
import EventsPage from "../pages/events-page";
import CoursesPage from "../pages/courses-page";
import AboutPage from "../pages/about-page";
import ContactPage from "../pages/contact-page";


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
        ] // UserLayout'un cocuklarını yazıyoruz. 
    }
]);

const AppRouter = () => { //React uygulamasında yönlendirme (routing) işlemini gerçekleştirmek için kullanılır.
  return (
    <RouterProvider router={router}/> //React Router'ın bir bileşenidir ve uygulamanın yönlendirme mantığını yönetir.
  )
}

export default AppRouter
