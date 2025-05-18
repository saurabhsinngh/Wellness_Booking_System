/** ***** Function for pagination ******/
const paginate = ({page = 1, limit = 10}) => {
    const limitInt = parseInt(limit);
    const pagetInt = parseInt(page);
    let offset = (pagetInt - 1) * limitInt;
    if (offset < 0) {
        offset = 0;
    }

    return {
        offset,
        limit: limitInt,
    };
};

module.exports = paginate;
