import {configureStore} from '@reduxjs/toolkit';

import userReducer from "./slice/user"
import fishReducer from "./slice/fish"
import lakeReducer from "./slice/lake"
import catchReducer from "./slice/catch"

const store = configureStore({
    reducer: {
        user: userReducer,
        fish: fishReducer,
        lake: lakeReducer,
        catch: catchReducer,
    }
})

export {store}