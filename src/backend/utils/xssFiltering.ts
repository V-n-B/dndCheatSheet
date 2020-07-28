import xssFilters from 'xss-filters';

export function xssFiltering(args: any[]) {
    if (args.length < 1) {
        throw Error('Expected at least 1 element');
    }

    const argsCopy = [...args];
    return argsCopy.map(field => xssFilters.inHTMLData(field));
}
