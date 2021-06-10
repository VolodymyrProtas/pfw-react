const sort = (array, column, asc) => {
    addSortingClass(column, asc);
    return array.sort((a, b) => {
        if (a[column] < b[column]) {
            return asc ? -1 : 1;
        } else if (a[column] > b[column]) {
            return asc ? 1 : -1;
        } else {
            return 0;
        }
    });
}

const addSortingClass = (column, asc) => {
    let direction = 'asc';
    if (!asc) {
        direction = 'desc'
    }
    let headerCells = document.querySelectorAll('th');
    headerCells.forEach((cell) => {
        cell.classList.remove('sorting', 'asc', 'desc');
    })
    document.getElementById(column).classList.add('sorting', direction);
}

export default {sort}