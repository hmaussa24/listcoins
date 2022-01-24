import { Box, Grid } from "@mui/material";
import NumberFormat from "react-number-format";
import { useAppSelector } from "../../../Redux/hook/hook";
import { ICoinDetails } from "../../../Shared/Models/CoinDetail.model";

const DataCoinBasic = (props: ICoinDetails) => {
  const { coin } = props;
  const general = useAppSelector((state) => state.general);
  return (
    <Box>
      <Grid
        container
        justifyContent="center"
        className={
          general.dark
            ? "basic-details--dark border-radius"
            : "basic-details--normal border-radius"
        }
      >
        <Grid item xs={12}>
          <Grid container justifyContent="center">
            <img alt="sss" src={`https://www.coinlore.com/img/${coin?.nameid}.webp`} />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container justifyContent="center">
            <label
              className={general.dark ? "text-color-white " : "text-color-coin"}
            >
              {coin?.name}
            </label>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container justifyContent="center">
              <NumberFormat
                className={general.dark ? "text-color-white" : "text-color-coin"}
                value={coin?.price_usd}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />

          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DataCoinBasic;
