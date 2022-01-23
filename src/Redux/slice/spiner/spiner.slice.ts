import { createSlice } from "@reduxjs/toolkit";
import { ISpinnerStateModel } from "./model/spiner.model";

const initialState: ISpinnerStateModel = {
    active: false,
    count: 0
};

const SpinnerSlice = createSlice({
    name: 'spinner slice',
    initialState,
    reducers: {
        showSpinner: (state: ISpinnerStateModel):any => {
            state.count++;
            state.active = state.count > 0;
        },
        closeSpinner: (state: ISpinnerStateModel) => {
            if(state.count !== 0){
                state.count--;
                state.active = state.count > 0;
            }
        },
    }
});

export const { showSpinner, closeSpinner } = SpinnerSlice.actions;
export default SpinnerSlice.reducer;