const allowedFieldsForSorting = ['like', 'hate', 'createdAt'];

function createSortQueryObject(sortedBy) {
    let sortQueryObject = { $sort: {} };
    if (!sortedBy || !allowedFieldsForSorting.includes(sortedBy)) {
        sortQueryObject.$sort.createdAt = 1;
        return sortQueryObject;
    }

    sortQueryObject.$sort[sortedBy] = 1;
    return sortQueryObject;
}

module.exports = { createSortQueryObject }