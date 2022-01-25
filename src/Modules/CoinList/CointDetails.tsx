import { Box, Grid } from "@mui/material";
import { useCallback, useState } from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/hook/hook";
import {
  closeSpinner,
  showSpinner,
} from "../../Redux/slice/spiner/spiner.slice";
import { CoinsDataApi } from "../../Services/API/CoinsData.api";
import { ICoin } from "../../Shared/Models/CoinData.model";
import { IMarket } from "../../Shared/Models/Markets.model";
import CoinMarketPrice from "./Components/CoinMarketPrice";
import DataCoinBasic from "./Components/DataCoinBasic";
import DataCoinChange from "./Components/DataCoinChange";
import DataMarketCoin from "./Components/DataMarketCoin";
import GeneralDataCoinComponent from "./Components/GeneralDataCoinComponent";

const CointDetails = () => {
  // hooks
  const [coin, setCoin] = useState<ICoin>();
  const [markets, setMarkets] = useState<IMarket[]>([]);
  //redux
  const dispatcher = useAppDispatch();
  const general = useAppSelector((state) => state.general);
  const getCoinData = useCallback(() => {
    dispatcher(showSpinner());
    CoinsDataApi.getCoinData(general.idCoin)
      .then((result) => {
        setCoin(result.data[0]);
        dispatcher(closeSpinner());
      })
      .catch((error) => {
        dispatcher(closeSpinner());
      });
  }, [dispatcher, general.idCoin]);
  const getMarketsData = useCallback(() => {
    dispatcher(showSpinner())
    CoinsDataApi.getMarketsData(general.idCoin)
      .then((result) => {
        setMarkets(result.data) 
        dispatcher(closeSpinner());
      })
      .catch((error) => {
        dispatcher(closeSpinner());
      });
  },[dispatcher, general.idCoin]);

  useEffect(() => {
    getCoinData();
    getMarketsData()
    const anchor = (document
    ).querySelector("#back-to-top-anchor");

    if (anchor) {
      anchor.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [getCoinData, getMarketsData]);

  return (
    <>
      <GeneralDataCoinComponent />
      <Box m={2}>
        <Grid container justifyContent="center">
          <Grid item xs={2}>
            <DataCoinBasic coin={coin} />
          </Grid>
          <Grid item xs={6}>
            <Grid container justifyContent="flex-start">
              <Grid item xs={12}>
                <DataMarketCoin coin={coin} />
              </Grid>
              <Grid item xs={12}>
                <CoinMarketPrice coin={coin} />
              </Grid>
              <Grid item xs={12}>
                <DataCoinChange market={markets} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CointDetails;
