import {useDispatch, useSelector} from "react-redux";
import {Fragment, useEffect} from "react";
import {fetchLiveTrades} from "../redux";
import dateFormatter from "../dateFormatter";

const Field3 = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchLiveTrades())
    }, [dispatch])
    const liveTrades = useSelector(state => state.liveTrades);

    return <div className="field3">
        {
            !liveTrades?.length ? <span style={{gridColumn: 'span 4'}}>Waiting for a trade..</span> :
                <Fragment>
                    <span style={{gridColumn: 'span 4', textAlign: 'left'}}>LIVE TRADES</span>
                    <span>Tür</span><span>Fiyat</span><span>Miktar</span><span>Saat</span>
                    {
                        liveTrades.map((x, y) => {
                            return (
                                <Fragment key={y}>
                                    <span
                                        style={{color: x.type === 0 ? 'green' : 'red'}}>{x.type === 0 ? 'BUY' : 'SELL'}</span>
                                    <span>{x.price}</span>
                                    <span>{x.amount}</span>
                                    <span>{dateFormatter(parseInt(x.timestamp))}</span>
                                </Fragment>
                            )
                        })
                    }
                </Fragment>
        }
    </div>
}

export default Field3;