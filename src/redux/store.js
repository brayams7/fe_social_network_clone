import { configureStore } from "@reduxjs/toolkit";
import { createBrowserHistory } from 'history'

import { reducer } from "./reducers";
import { apiSlice } from "../services/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
// import { createRouterMiddleware} from '@lagunovsky/redux-react-router'

// export const history = createBrowserHistory()
// const routerMiddleware = createRouterMiddleware(history)

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>getDefaultMiddleware().concat(apiSlice.middleware),
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(routerMiddleware),
})

setupListeners(store.dispatch)