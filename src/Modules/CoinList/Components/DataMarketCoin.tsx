import { Box, Grid } from "@mui/material";
import NumberFormat from "react-number-format";
import { useAppSelector } from "../../../Redux/hook/hook";
import { Labels } from "../../../Shared/Labels";
import { ICoinDetails } from "../../../Shared/Models/CoinDetail.model";

const DataMarketCoin = (props: ICoinDetails) => {
  const {coin} = props
  const general = useAppSelector((state) => state.general);
  return (
    <Box m={2}>
      <Grid container justifyContent="space-between" className={ 
          general.dark ? "basic-details--dark border-radius" : "basic-details--normal border-radius"
        }>
        <Grid item xs={3}>
          <Grid container justifyContent="center">
            <Grid
              item
              xs={12}
              className={general.dark ? "text-color-white" : ""}
            >
              {Labels.capitalizacion}
            </Grid>
            <Grid item xs={12}>
              <NumberFormat
                value={coin?.market_cap_usd}
                className="number-general"
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Grid container justifyContent="center">
            <Grid
              item
              xs={12}
              className={general.dark ? "text-color-white" : ""}
            >
              {Labels.volumen}
            </Grid>
            <Grid item xs={12}>
              <NumberFormat
                value={coin?.volume24}
                className="number-general"
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Grid container justifyContent="center">
            <Grid
              item
              xs={12}
              className={general.dark ? "text-color-white" : ""}
            >
              {Labels.hd}
            </Grid>
            <Grid item xs={12}>
              <NumberFormat
                value={coin?.percent_change_24h}
                className="number-general"
                displayType={"text"}
                thousandSeparator={true}
                suffix={"%"}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Grid container justifyContent="center">
            <Grid
              item
              xs={12}
              className={general.dark ? "text-color-white" : ""}
            >
              {Labels.bitcoin}
            </Grid>
            <Grid item xs={12}>
              <NumberFormat
                value={coin?.price_btc}
                className="number-general"
                displayType={"text"}
                thousandSeparator={true}
                prefix={"B"}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DataMarketCoin;
