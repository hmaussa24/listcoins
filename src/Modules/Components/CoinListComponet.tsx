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
import { Labels } from "../../Shared/Labels";
import { ICoinList } from "../../Shared/Models/CionList.model";
import { isPositive } from "../../Utils/NumbersOperations";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useAppSelector } from "../../Redux/hook/hook";
import { Link } from "react-router-dom";
import { UrlRoutes } from "../../Shared/UrlRoutes";
/**
 * El componente que contiene la tabla de las criptos
 * @param props recibe la lista de criptos, las funciones de paginado y ademas la funcion que ordena las criptos
 * @returns 
 */
const CoinListComponent = (props: ICoinList) => {
  const { Coins, ordenarCoins, asc, paginationNavigator } = props;
  const general = useAppSelector(state => state.general)
  return (
    <Box mt={2}>
      <Grid container justifyContent="center">
        <Grid className={general.dark ? "title-table-dark" : "title-table"}>{Labels.titleTale}</Grid>
        <Grid item xs={10} >
          <TableContainer component={Paper} sx={ general.dark ?  {backgroundColor: "#363636"} : {}}>
            <Table aria-label="a dense table" >
              <TableHead>
                <TableRow>
                  <TableCell align="center" width={60}>
                    <Grid className="text-color-coin " sx={ general.dark ?  {color: "#fff"} : {}}>{Labels.id}</Grid>
                  </TableCell>
                  <TableCell align="center" width={250}>
                    <Grid className="text-color-coin" sx={ general.dark ?  {color: "#fff"} : {}}>{Labels.moneda}</Grid>
                  </TableCell>
                  <TableCell align="center" width={150}>
                    <Grid className="text-color-coin" sx={ general.dark ?  {color: "#fff"} : {}}>
                      <label
                        className="label-price"
                        onClick={ordenarCoins}
                      >{`${Labels.precio} (${Labels.usd})`}</label>
                      {asc ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
                    </Grid>
                  </TableCell>
                  <TableCell align="center">
                    <Grid className="text-color-coin" sx={ general.dark ?  {color: "#fff"} : {}}>{Labels.h}</Grid>
                  </TableCell>
                  <TableCell align="center">
                    <Grid className="text-color-coin" sx={ general.dark ?  {color: "#fff"} : {}}>{Labels.hd}</Grid>
                  </TableCell>
                  <TableCell align="center">
                    <Grid className="text-color-coin" sx={ general.dark ?  {color: "#fff"} : {}}>{Labels.d}</Grid>
                  </TableCell>
                  <TableCell align="center" width={250}>
                    <Grid className="text-color-coin" sx={ general.dark ?  {color: "#fff"} : {}}>
                      {" "}
                      {Labels.capitalizacion}
                    </Grid>
                  </TableCell>
                  <TableCell align="center">
                    <Grid className="text-color-coin" sx={ general.dark ?  {color: "#fff"} : {}}>{Labels.volumen}</Grid>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Coins.map((coin, index) => (
                  <TableRow
                    key={coin.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">
                      <Grid className="text-base" sx={ general.dark ?  {color: "#fff"} : {}}>{index + 1}</Grid>
                    </TableCell>
                    <TableCell align="left">
                      <Grid container>
                        <Grid item xs={3}>
                          <img
                            src={`${process.env.REACT_APP_URL_ICON}${coin.nameid}.png`}
                            alt={coin.nameid}
                          />
                        </Grid>
                        <Grid item xs={7} className="text-color-coin" sx={ general.dark ?  {color: "#fff"} : {}}>
                          <Grid><Link className="link--white" to={UrlRoutes.details}>{coin.name}</Link></Grid>
                          <Grid>{coin.symbol}</Grid>
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell align="center">
                      <NumberFormat
                        className={general.dark ? "text-color-white" :"text-base"}
                        value={coin.price_usd}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Grid
                        className={
                          isPositive(Number(coin.percent_change_1h))
                            ? "text-color-green text-base"
                            : "text-color-red text-base"
                        }

                      >
                        {coin.percent_change_1h}
                      </Grid>
                    </TableCell>
                    <TableCell align="center">
                      <Grid
                        className={
                          isPositive(Number(coin.percent_change_24h))
                            ? "text-color-green text-base"
                            : "text-color-red text-base"
                        }
     
                      >
                        {coin.percent_change_24h}
                      </Grid>
                    </TableCell>
                    <TableCell align="center">
                      <Grid
                        className={
                          isPositive(Number(coin.percent_change_7d))
                            ? "text-color-green text-base"
                            : "text-color-red text-base"
                        }

                      >
                        {coin.percent_change_7d}
                      </Grid>
                    </TableCell>
                    <TableCell align="center">
                      <NumberFormat
                        value={coin.market_cap_usd}
                        className={general.dark ? "text-color-white" :"text-base"}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <NumberFormat
                        value={coin.volume24}
                        className={general.dark ? "text-color-white" :"text-base"}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box m={2}>
            <Grid container justifyContent="flex-end">
              <Grid item >
                <ArrowLeftIcon onClick={() => { paginationNavigator(0)}}   className="arrow" sx={{fontSize: 50}}/>
              </Grid>
              <Grid item >
                <ArrowRightIcon onClick={() => { paginationNavigator(1)}}   className="arrow" sx={{fontSize: 50}}/>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CoinListComponent;
