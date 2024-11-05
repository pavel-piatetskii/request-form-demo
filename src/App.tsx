import { Box, CircularProgress } from "@mui/material";
import "./App.css";
import { Suspense, lazy } from "react";
import {
  // BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { Link } from "@mui/material";

const RequestForm = lazy(() => import("./pages/RequestForm"));
const DataViewer = lazy(() => import("./pages/DataViewer"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  const navigate = useNavigate();
  return (
    // <BrowserRouter>
    <Box sx={{ height: "100vh" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          width: 400,
        }}
      >
        <Link
          onClick={() => navigate("/form")}
          variant="button"
          underline="none"
          sx={{ cursor: "pointer" }}
        >
          Request Form
        </Link>
        <Link
          onClick={() => navigate("/data")}
          variant="button"
          underline="none"
          sx={{ cursor: "pointer" }}
        >
          Data Viewer
        </Link>
      </Box>
      <Suspense
        fallback={
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CircularProgress />
          </Box>
        }
      >
        <Routes>
          <Route path="/" element={<Navigate to="/form" />} />
          <Route path="/form" element={<RequestForm />} />
          <Route path="/data" element={<DataViewer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Box>
  );
}

export default App;
