/* eslint-disable no-underscore-dangle */
const pageWrapper = (arrToPaginate: Array<any>, pageSize: number) => {
    const nextPage = arrToPaginate.length && arrToPaginate.length === pageSize + 1 ? arrToPaginate[arrToPaginate.length - 2]._id : null;
    if (arrToPaginate.length === pageSize + 1) {
        arrToPaginate.pop();
    }
    const paginatedResults = arrToPaginate;
    return { paginatedResults, nextPage };
};
export default pageWrapper;
