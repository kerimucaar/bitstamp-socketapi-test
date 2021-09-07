import {Fragment, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchLiveOrders} from "../redux";
import dateFormatter from "../dateFormatter";

const Field2 = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchLiveOrders())
    }, [dispatch])
    const liveOrders = useSelector(state => state.liveOrders);

    return <div className='field2'>
        <span style={{gridColumn: 'span 3'}}>LIVE ORDERS</span>
        <span>Fiyat (USD)</span>
        <span>Miktar (BTC)</span>
        <span>Saat</span>
        {
            liveOrders?.length ? liveOrders.map((x, y) => {
                return <Fragment key={y}>
                    <span style={{color: x.order_type === 0 ? 'green' : 'red'}}>{x.price}</span>
                    <span>{x.amount}</span>
                    <span>{dateFormatter(x.datetime)}</span>
                </Fragment>
            }) : <span style={{gridColumn: 'span 3'}}>Loading live orders</span>
        }
    </div>
}

export default Field2