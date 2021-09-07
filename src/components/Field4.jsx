const Field4 = () => {
    document.addEventListener('DOMContentLoaded', () => {
        let script = document.createElement('script');
        script.async = true;
        script.innerHTML = new window.TradingView.widget({
            "autosize": true,
            "symbol": "BITSTAMP:BTCUSD",
            "interval": "5",
            "timezone": "Etc/UTC",
            "theme": "dark",
            "style": "1",
            "locale": "tr",
            "toolbar_bg": "#f1f3f6",
            "enable_publishing": false,
            "allow_symbol_change": true,
            "container_id": "tradingview_9d499"
        })
    })

    return (
        <div className="tradingview-widget-container" style={{padding: '0'}}>
            <div id="tradingview_9d499" style={{height: '100%'}}></div>
        </div>
    )
}

export default Field4;