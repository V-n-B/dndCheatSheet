import { useLocation } from 'react-router-dom';

export function useQuery() {
    // IE11 does not support this. Tough luck IE11!
    return new URLSearchParams(useLocation().search);
}
