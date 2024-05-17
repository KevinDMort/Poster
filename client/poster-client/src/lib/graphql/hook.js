import { useQuery } from "@apollo/client";
import { timelineQuery, userDetailsQuery, getPostByIdQuery} from "./queries";
import { useMutation } from "@apollo/client";

export function useTimeline(limit, offset){
    const { data, loading, error } = useQuery(timelineQuery, {
        variables: {
            limit, 
            offset
        },
        fetchPolicy: 'network-only',
    });
    return{ timeline: data?.timeline, loading, error };
 }

 export function useUserDetails(userId)
 {
        const { data, loading, error } = useQuery(userDetailsQuery, {
            variables: {
                userId
            },
            fetchPolicy: 'network-only'
        });
        return { user: data?.user, loading, error };
 }
 
 export function usePost(postId)
 {
        const { data, loading, error } = useQuery(getPostByIdQuery, {
            variables: {
                postId
            },
            fetchPolicy: 'network-only'
        });
        return { post: data?.post, loading, error };
 }