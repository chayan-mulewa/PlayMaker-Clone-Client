import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { appRoute, userRoute, adminRoute } from "./routes/";
import { Layout } from "./layouts";
import { Loading } from "./components";

export default function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <Loading
            theme="white"
            width="w-full"
            height="min-h-dvh"
            background="bg-bgColor"
          />
        }
      >
        <Layout>
          <Routes>
            {appRoute.map((r, index) => (
              <Route key={index} path={r.path} element={r.element} />
            ))}
            {userRoute.map((r, index) => (
              <Route key={index} path={r.path} element={r.element} />
            ))}
            {adminRoute.map((r, index) => (
              <Route key={index} path={r.path} element={r.element} />
            ))}
          </Routes>
        </Layout>
      </Suspense>
    </BrowserRouter>
  );
}
