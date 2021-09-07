import {applyMiddleware, compose, createStore} from "redux";
import thunk from 'redux-thunk';

// ACTION TYPES
const ORDER_BOOK = 'ORDER_BOOK';
const LIVE_ORDERS = 'LIVE_ORDERS';
const LIVE_TRADES = 'LIVE_TRADES';

// REDUCERS
const initialState = {
    orderBook: {},
    liveOrders: [],
    liveTrades: []
}
const reducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case ORDER_BOOK:
            return {
                ...state,
                orderBook: {
                    ...payload,
                    asks: payload?.asks?.sort((a, b) => {
                        return a[0] > b[0] ? 1 : -1
                    }).slice(0, 15),
                    bids: payload?.bids?.sort((a, b) => {
                        return a[0] < b[0] ? 1 : -1
                    }).slice(0, 15),

                }
            }

        case LIVE_ORDERS:
            return {
                ...state,
                liveOrders: payload
            }

        case LIVE_TRADES:
            return {
                ...state,
                liveTrades: payload
            }
        default:
            return state
    }
}

// CREATING ACTIONS
export const fetchOrderBook = payload => dispatch => {
    const ws = new WebSocket('wss://ws.bitstamp.net');
    ws.onopen = () => {
        ws.send(JSON.stringify({
            "event": "bts:subscribe",
            "data": {
                "channel": "order_book_btcusd"
            }
        }))
    }

    ws.onmessage = (message) => {
        let response = JSON.parse(message.data).data;
        if (Object.keys(response).length) {
            dispatch({
                type: ORDER_BOOK,
                payload: response
            })
        }
    }
}

export const fetchLiveOrders = payload => dispatch => {
    const ws = new WebSocket('wss://ws.bitstamp.net');
    ws.onopen = () => {
        ws.send(JSON.stringify({
            "event": "bts:subscribe",
            "data": {
                "channel": "live_orders_btcusd"
            }
        }))
    }

    let latestOrders = [];
    ws.onmessage = (message) => {
        const response = JSON.parse(message.data).data;
        if (Object.keys(response).length) {
            if (latestOrders.length >= 35) latestOrders.shift();
            latestOrders = [...latestOrders, response]
            // latestOrders.push(response);
        }

        dispatch({
            type: LIVE_ORDERS,
            payload: latestOrders
        })
    }
}

export const fetchLiveTrades = payload => dispatch => {
    const ws = new WebSocket('wss://ws.bitstamp.net');
    ws.onopen = () => {
        ws.send(JSON.stringify({
            "event": "bts:subscribe",
            "data": {
                "channel": "live_trades_btcusd"
            }
        }))
    }

    let latestTrades = [];
    ws.onmessage = (message) => {
        const response = JSON.parse(message.data).data;
        if (Object.keys(response).length) {
            if (latestTrades.length >= 16) latestTrades.shift();
            latestTrades = [...latestTrades, response]
        }

        dispatch({
            type: LIVE_TRADES,
            payload: latestTrades
        })
    }
}

// CREATING STORE
export const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)
