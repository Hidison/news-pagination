import { Container } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import NotFoundPage from "../pages/not-found";
import MainPage from "../pages/main";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") {
      return navigate("/news-pagination", { replace: true });
    }
  }, [location, navigate]);

  return (
    <Container maxWidth="sm">
      <Routes>
        <Route exact path="/news-pagination" element={<MainPage />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </Container>
  );
};

export default App;
