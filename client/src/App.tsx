import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Signin from "./pages/Signin";

function App() {
  
  const routes = [
    <Route key="main" path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="signin" element={<Signin />} />
      {/* <Route path="about" element={<About />} />
      <Route path="projects" element={<Projects />} />
      <Route path="contact" element={<Contact />} /> */}
    </Route>,
    // <Route key="not-found" path="*" element={<NotFound />} />
  ];

  const router = createBrowserRouter(createRoutesFromElements(routes));

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
