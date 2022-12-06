import format from "date-fns/format";


function dateFilter(date) {
    const formatDate = format(new Date(date), "dd MMMM yyyy")

    return formatDate
}

export default dateFilter;