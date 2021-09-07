import {useDispatch, useSelector} from "react-redux";
import {Fragment, useEffect} from "react";
import {fetchOrderBook} from "../redux";

const Field1 = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchOrderBook())
    }, [dispatch])
    const orderBook = useSelector(state => state.orderBook);

    return <div className='field1'>
        <div className="field1TopSection">
            <span style={{gridColumn: 'span 3'}}>ASKS</span>
            <span>Fiyat (USD)</span><span>Miktar (BTC)</span><span>Toplam</span>
            {
                orderBook?.asks?.length ? orderBook?.asks?.map((x, y) => {
                    return <Fragment key={y}>
                        <span style={{color: 'red'}}>{x[0]}</span>
                        <span>{x[1]}</span>
                        <span>{x[0] + x[1]}</span>
                    </Fragment>
                }) : <span style={{gridColumn: 'span 3'}}>Loading asks...</span>
            }
        </div>
        <div className="field1BottomSection">
            <span style={{gridColumn: 'span 3'}}>BIDS</span>
            <span>Fiyat (USD)</span><span>Miktar (BTC)</span><span>Toplam</span>
            {
                orderBook?.bids?.length ? orderBook?.bids?.map((x, y) => {
                    return <Fragment key={y}>
                        <span style={{color: 'green'}}>{x[0]}</span>
                        <span>{x[1]}</span>
                        <span>{x[0] + x[1]}</span>
                    </Fragment>
                }) : <span style={{gridColumn: 'span 3'}}>Loading bids...</span>
            }
        </div>
    </div>
}

export default Field1;