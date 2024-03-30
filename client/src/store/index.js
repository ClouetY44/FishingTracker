import {configureStore} from '@reduxjs/toolkit';

import userReducer from "./slice/user"
import fishReducer from "./slice/fish"
import lakeReducer from "./slice/lake"
import catchReducer from "./slice/catch"
import homeReducer from "./slice/home"

const store = configureStore({
    reducer: {
        user: userReducer,
        home: homeReducer,
        fish: fishReducer,
        lake: lakeReducer,
        catch: catchReducer,
    }
})

export {store}