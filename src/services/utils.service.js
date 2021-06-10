const filterArray = (array, wildcard) => {
    if (array && wildcard) {
        return array.filter(item => {
            let match = false;
            (Object).values(item).some(value => {
                if (value && value.includes && !Array.isArray(value)) {
                    match = value.toLowerCase().includes(wildcard.toLowerCase());
                    return match;
                }
                if (value && !value.includes) {
                    let stringValue = value.toString();
                    match = stringValue.toLowerCase().includes(wildcard.toLowerCase());
                    return match;
                }
                return false;
            });
            return match;
        });
    }
    return array;
}

export default {filterArray}