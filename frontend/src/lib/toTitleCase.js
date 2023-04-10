const toTitleCase = input => {
    if (input === null || input === undefined) {
        return '';
    } else if (typeof input === "boolean") {
        if (input) { return "Yes"; }
        else {return "No";}
    } else if (Array.isArray(input)) {
        return input.map(element => toTitleCase(element)).join(', ');
    } else {
        const str = input.replace(/_/g, ' ');
        return str.replace(
            /\w\S*/g,
            function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    }
}

export default toTitleCase;
