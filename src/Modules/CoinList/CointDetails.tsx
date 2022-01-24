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
import DataCoinBasic from "./Components/DataCoinBasic";
import DataMarketCoin from "./Components/DataMarketCoin";
import GeneralDataCoinComponent from "./Components/GeneralDataCoinComponent";

const CointDetails = () => {
  // hooks
 const [coin, setCoin] = useState<ICoin>();
  //redux
  const dispatcher = useAppDispatch();
  const general = useAppSelector((state) => state.general);
  const getCoinData = useCallback(() => {
    dispatcher(showSpinner());
    CoinsDataApi.getCoinData(general.idCoin)
      .then((result) => {
        setCoin(result.data[0])
        dispatcher(closeSpinner());
      })
      .catch((error) => {
        dispatcher(closeSpinner());
      });
  }, [dispatcher, general.idCoin]);

  useEffect(() => {
    getCoinData();
  }, [getCoinData]);

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
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CointDetails;
