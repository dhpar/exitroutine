import { useEffect, useState } from "react";

function reducer(state, { type, payload }) {
    switch (type) {
      case "init":
        return {
            ...payload,
            loading: true
        };
    case "success":
        return {
            ...payload,
            data: state,
            loading: false
        };
    case "error":
    default:
        return {
            ...payload,
            loading: false,
            error: payload.error,
        };
    }
}

const useFetchQuery = (fetchRequest:Promise<Request>) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchRequest();
                setData(result);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [fetchRequest]);

    return { data, loading, error };
};

export default useFetchQuery;