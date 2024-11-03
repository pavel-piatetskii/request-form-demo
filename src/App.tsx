import './App.css'
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const RequestForm = lazy(() => import("./pages/RequestForm"));
const DataViewer = lazy(() => import("./pages/DataViewer"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {

  return (
    <BrowserRouter>
      <div className="size-full overflow-hidden">
          <Suspense >
            <Routes>
              <Route path="/" element={<Navigate to="/form" />} />
              <Route path="/form" element={<RequestForm />} />
              <Route path="/data" element={<DataViewer />} />
              <Route path="*" element={<NotFound />} />

            </Routes>
          </Suspense>
      </div>
  </BrowserRouter>
  )
}

export default App
