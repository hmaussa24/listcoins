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
import { IMarkets } from "../../../Shared/Models/Markets.model";
import { isPositive } from "../../../Utils/NumbersOperations";

const DataCoinChange = (props: IMarkets) => {
  const { market } = props;
  //redux
  const general = useAppSelector((state) => state.general);
  return (
    <Box m={2}>
      <Grid className={general.dark ? "title-table-dark" : "title-table"}>
        {Labels.exchangesPrecios}
      </Grid>
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
                  {Labels.id}
                </Grid>
              </TableCell>
              <TableCell align="center" width={250}>
                <Grid
                  className="text-color-coin"
                  sx={general.dark ? { color: "#fff" } : {}}
                >
                  {Labels.nombre}
                </Grid>
              </TableCell>
              <TableCell align="left">
                <Grid
                  className="text-color-coin"
                  sx={general.dark ? { color: "#fff" } : {}}
                >
                  {Labels.precio}
                </Grid>
              </TableCell>
              <TableCell align="left">
                <Grid
                  className="text-color-coin"
                  sx={general.dark ? { color: "#fff" } : {}}
                >
                  {Labels.volumen}
                </Grid>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {market && market?.map((item, index) => (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">
                  <Grid sx={general.dark ? { color: "#fff" } : {}}>
                    {index + 1}
                  </Grid>
                </TableCell>
                <TableCell align="center">
                  <Grid sx={general.dark ? { color: "#fff" } : {}}>
                    {item.name}
                  </Grid>
                </TableCell>
                <TableCell align="left">
                  <Grid>
                    <NumberFormat
                      className={general.dark ? "text-color-white" : ""}
                      value={item.price_usd}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </Grid>
                </TableCell>
                <TableCell align="left">
                  <Grid>
                    <NumberFormat
                      className={general.dark ? "text-color-white" : ""}
                      value={item.volume_usd}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </Grid>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DataCoinChange;
