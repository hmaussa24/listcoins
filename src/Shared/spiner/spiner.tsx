import { Backdrop, CircularProgress } from "@material-ui/core";
import { useAppSelector } from "../../Redux/hook/hook";

const Spinner = () => {
    const spinner = useAppSelector(state => state.spinner);
    return (
        <Backdrop style={{ zIndex: 3000 }} open={spinner.active}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}

export default Spinner;