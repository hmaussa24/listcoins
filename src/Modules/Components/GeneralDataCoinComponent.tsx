import { Box, Grid } from "@mui/material";
import { Labels } from "../../Shared/Labels";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import PaidIcon from "@mui/icons-material/Paid";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import MoneyIcon from "@mui/icons-material/Money";
import { useCallback, useEffect, useState } from "react";
import { GeneralDataApi } from "../../Services/API/GeneralData.api";
import { IGeneralData } from "../../Shared/Models/GeneralData.model";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import NumberFormat from "react-number-format";
import { useAppDispatch, useAppSelector } from "../../Redux/hook/hook";
import { setGeneral } from "../../Redux/slice/general/general.slice";
/**
 * Este componente es el marco superior que muestra las generalidades del mercado, en este caso el componente
 * no recibe ningun dato
 * @returns 
 */
const GeneralDataCoinComponent = () => {
  const [generalData, setGeneralData] = useState<IGeneralData>();
  const dispatcher = useAppDispatch();
  const general =  useAppSelector(state => state.general)

  /**
   * Funcion para consultar las generalidades del mercado
   */
  const getGeneralData = useCallback(() => {
    GeneralDataApi.getGeneralData()
      .then((result) => {
        setGeneralData(result.data[0]);
        dispatcher(setGeneral(result.data[0].coins_count));
      })
      .catch((error) => {});
  }, [dispatcher]);

  /**
   * hook que llama la funcion de consulta y ademas dispara un intervalo de 10 segundos para refrescar los datos de mercado
   */
  useEffect(() => {
    getGeneralData();
    const interval = setInterval(() => {
      getGeneralData();
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, [getGeneralData]);
  return (
    <div className={general.dark ? "general-details-dark" : "general-details"}>
      <Box m={8} p={2}>
        <Grid item xs={12}>
          <Grid container justifyContent="space-between">
            <Grid item xs={2}>
              <Grid container justifyContent="flex-start">
                <Grid item xs={2}>
                  <PaidIcon color="action" sx={general.dark ? {color: "#fff"} : {}} />
                </Grid>
                <Grid item xs={7} className={general.dark ? "text-color-white": ""}>
                  {Labels.coins}:
                </Grid>
                <Grid item xs={3}>
                  <NumberFormat
                    value={generalData?.coins_count}
                    className="number-general"
                    displayType={"text"}
                    thousandSeparator={true}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <Grid container justifyContent="flex-start">
                <Grid item xs={2}>
                  <LocalMallIcon color="action" sx={general.dark ? {color: "#fff"} : {}} />
                </Grid>
                <Grid item xs={5} className={general.dark ? "text-color-white": ""}>
                  {Labels.mercados}:
                </Grid>
                <Grid item xs={4}>
                  <NumberFormat
                    value={generalData?.active_markets}
                    className="number-general"
                    displayType={"text"}
                    thousandSeparator={true}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <Grid container justifyContent="flex-start">
                <Grid item xs={1}>
                  <AccountBalanceIcon color="action" sx={general.dark ? {color: "#fff"} : {}} />
                </Grid>
                <Grid item xs={4} className={general.dark ? "text-color-white": ""}>
                  {Labels.capitalizacion}:
                </Grid>
                <Grid item xs={6}>
                  <NumberFormat
                    value={generalData?.total_mcap}
                    className="number-general"
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <Grid container justifyContent="flex-start">
                <Grid item xs={1}>
                  <EqualizerIcon color="action" sx={general.dark ? {color: "#fff"} : {}}  />
                </Grid>
                <Grid item xs={3} className={general.dark ? "text-color-white": ""}>
                  {Labels.volumen}:
                </Grid>
                <Grid item xs={6}>
                  <NumberFormat
                    value={generalData?.total_volume}
                    className="number-general"
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <Grid container justifyContent="flex-start">
                <Grid item xs={2}>
                  <MoneyIcon color="action"sx={general.dark ? {color: "#fff"} : {}}  />
                </Grid>
                <Grid item xs={7} className={general.dark ? "text-color-white": ""}>
                  {Labels.predominioBtc}:
                </Grid>
                <Grid item xs={3}>
                  <label className="number-general">
                    {generalData?.btc_d}%
                  </label>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default GeneralDataCoinComponent;
