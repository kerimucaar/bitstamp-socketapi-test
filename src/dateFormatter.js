const dateFormatter = (timestamp) => {
    const time = new Date(timestamp * 1000);
    let parse;
    parse = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
    parse += ':';
    parse += time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
    parse += ':';
    parse += time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();

    return parse;
}

export default dateFormatter;