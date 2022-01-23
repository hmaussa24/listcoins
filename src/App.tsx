import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppFrame from "./Shared/AppFrame";
import { UrlRoutes } from "./Shared/UrlRoutes";
import CoinList from "./Modules/CoinList/CointList";
import CointDetails from "./Modules/CoinList/CointDetails";
import "./Assets/styles.scss";
import Spinner from "./Shared/spiner/spiner";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppFrame>
          <Routes>
            <Route path={UrlRoutes.main} element={<CoinList />} />
            <Route path={UrlRoutes.details} element={<CointDetails />} />
          </Routes>
        </AppFrame>
      </BrowserRouter>
      <Spinner />
    </>
  );
}

export default App;
