function plusZerro(...rest) {
    return rest.map((element) => {
        return (element < 10) ? (element = '0' + element) : element;
    });
}