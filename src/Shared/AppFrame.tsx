import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Zoom from "@mui/material/Zoom";
import { Labels } from "./Labels";
import { Fab, FormControlLabel, FormGroup, Grid, Switch } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState } from "react";
import { useAppDispatch } from "../Redux/hook/hook";
import { setDark } from "../Redux/slice/general/general.slice";
import { UrlRoutes } from "./UrlRoutes";
import { Link } from "react-router-dom";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: any;
}
function ScrollTop(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector("#back-to-top-anchor");

    if (anchor) {
      anchor.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Zoom>
  );
}


//Area de trabajo principal que recibe los children que en este caso serian los componentes
const AppFrame = (props: Props) => {
  const { children } = props;
  const [checked, setChecked] = useState<boolean>(false);
  const dispatcher =  useAppDispatch() 

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    dispatcher(setDark(event.target.checked))
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar sx={checked ? {backgroundColor: "#6a6a6a"}:{}}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link className="link--normal" to={UrlRoutes.main}>{Labels.nameApp}</Link>
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={<Switch checked={checked} color="default" onChange={handleChange} />}
                label={Labels.switchLabel}
              />
            </FormGroup>
          </Toolbar>
        </AppBar>
      </Box>
      <div id="back-to-top-anchor" className={checked ? "dark-bg-color-" : ""}> </div>
      <Grid item xs={12} sx={checked ? {backgroundColor: "#444444", minHeight: "100vh"}:{minHeight: "100vh"}}>
        {children}
      </Grid>
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
};

export default AppFrame;
