import { useQuery } from "@apollo/client";
import { timelineQuery } from "./queries";
import { useMutation } from "@apollo/client";

export function useTimeline(id, limit, offset){
    const { data, loading, error } = useQuery(timelineQuery, {
        variables: {
            id,
            limit, 
            offset
        },
        fetchPolicy: 'network-only',
    });
    return{ timeline: data?.timeline, loading, error };
 }