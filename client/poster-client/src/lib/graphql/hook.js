import { useQuery } from "@apollo/client";
import { timelineQuery, userDetailsQuery, getPostByIdQuery, getListOfFollowed, exploretimelineQuery, GET_CHATS, GET_MESSAGES, postsHistory} from "./queries";

export function useTimeline(limit, offset) {
    const { data, loading, error, fetchMore } = useQuery(timelineQuery, {
        variables: {
            limit,
            offset
        },
        fetchPolicy: 'network-only',
    });

    return { timeline: data?.timeline, loading, error, fetchMore };
}

export function useExploreTimeline(limit, offset) {
    const { data, loading, error, fetchMore } = useQuery(exploretimelineQuery, {
        variables: {
            limit,
            offset
        },
        fetchPolicy: 'network-only',
    });

    return { exploretimeline: data?.exploretimeline, loading, error, fetchMore };
    
}

export function useUserPostHistory(userID, limit, offset) {
    const { data, loading, error } = useQuery(postsHistory, {
      variables: {
        userID,
        limit,
        offset,
      },
      fetchPolicy: 'network-only',
    });
  
    return {
      posts: data?.postsforuserID || [],
      loading,
      error,
    };
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
 
 export function useFollowerList()
 {
    const { data, loading, error } = useQuery(getListOfFollowed,
        {
            fetchPolicy:'network-only'
        });
        return {followingList: data?.followingList,loading,error};
 }

 export function useGetMessages(conversationID) {
    const { data, loading, error, refetch } = useQuery(GET_MESSAGES, {
      variables: { conversationID },
      fetchPolicy: 'network-only'
    });
  
    return { loading, error, data, refetch };
  }

 export function useGetChats(){
    const { data, loading, error} = useQuery(GET_CHATS);
    
    return {data, loading, error};
 }