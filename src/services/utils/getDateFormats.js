function getDateFormat(date){
    let myDate = new Date(date);
    const dateVal = myDate.getDate().toString();
    const month = myDate.toLocaleString("en-US", {month : "long"} );
    const year = myDate.getFullYear().toString();

    return `${dateVal} ${month} ${year}`
}
function getWeekday(date){
    let myDate = new Date(date);
    const dayVal = myDate.getDay().toString();
    return `${dayVal}`
}

export { getWeekday, getDateFormat };