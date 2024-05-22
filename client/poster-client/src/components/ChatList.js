import { useGetChats } from "../lib/graphql/hook";

const ChatList = ({ onSelectChat }) => {
    const { loading, error, data } = useGetChats();
  
    if (loading) return <p>Loading chats...</p>;
    if (error) return <p>Error loading chats.</p>;
  
    return (
      <div>
        {data.chats.map(chat => (
          <div
            key={chat.id}
            onClick={() => onSelectChat(chat)}
            style={{ padding: '10px', borderBottom: '1px solid #ddd', cursor: 'pointer' }}
          >
            <div>{chat.participants.map(p => p.username).join(', ')}</div>
            <div>{chat.lastMessage.content}</div>
          </div>
        ))}
      </div>
    );
  };
  
  export default ChatList;