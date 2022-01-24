import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import NumberFormat from "react-number-format";
import { useAppSelector } from "../../../Redux/hook/hook";
import { Labels } from "../../../Shared/Labels";
import { ICoinDetails } from "../../../Shared/Models/CoinDetail.model";
import { isPositive } from "../../../Utils/NumbersOperations";
const CoinMarketPrice = (props: ICoinDetails) => {
  const { coin } = props;
  const general = useAppSelector((state) => state.general);
  return (
    <Box m={2}>
      <TableContainer
        component={Paper}
        sx={general.dark ? { backgroundColor: "#363636" } : {}}
      >
        <Table aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center" width={60}>
                <Grid
                  className="text-color-coin "
                  sx={general.dark ? { color: "#fff" } : {}}
                >
                  {Labels.vs}
                </Grid>
              </TableCell>
              <TableCell align="center" width={250}>
                <Grid
                  className="text-color-coin"
                  sx={general.dark ? { color: "#fff" } : {}}
                >
                  {Labels.h}
                </Grid>
              </TableCell>
              <TableCell align="center">
                <Grid
                  className="text-color-coin"
                  sx={general.dark ? { color: "#fff" } : {}}
                >
                  {Labels.hd}
                </Grid>
              </TableCell>
              <TableCell align="center">
                <Grid
                  className="text-color-coin"
                  sx={general.dark ? { color: "#fff" } : {}}
                >
                  {Labels.semana}
                </Grid>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">
                <Grid
                  className="text-color-coin"
                  sx={general.dark ? { color: "#fff" } : {}}
                >
                  {Labels.usd}
                </Grid>
              </TableCell>
              <TableCell align="center">
                <Grid
                  className={
                    isPositive(Number(coin?.percent_change_1h))
                      ? "text-color-green text-base"
                      : "text-color-red text-base"
                  }
                >
                  {coin?.percent_change_1h}
                </Grid>
              </TableCell>
              <TableCell align="center">
                <Grid
                  className={
                    isPositive(Number(coin?.percent_change_24h))
                      ? "text-color-green text-base"
                      : "text-color-red text-base"
                  }
                >
                  {coin?.percent_change_24h}
                </Grid>
              </TableCell>
              <TableCell align="center">
                <Grid
                  className={
                    isPositive(Number(coin?.percent_change_7d))
                      ? "text-color-green text-base"
                      : "text-color-red text-base"
                  }
                >
                  {coin?.percent_change_7d}
                </Grid>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CoinMarketPrice;
