import { useGetChats } from "../lib/graphql/hook";
import { getUser } from "../lib/auth";
import '../styling/ChatList.css'; // Make sure to create and import this CSS file

const ChatList = ({ onSelectChat }) => {
  const { loading, error, data } = useGetChats();
  const currentUser = getUser();

  if (loading) return <p>Loading chats...</p>;
  if (error) return <p>Error loading chats.</p>;

  return (
    <div className="chat-list-container">
      {data.chats.map(chat => {
        const otherParticipants = chat.participants.filter(p => p.id !== currentUser.id);
        const otherParticipantNames = otherParticipants.map(p => p.username).join(', ');

        return (
          <div
            key={chat.id}
            onClick={() => onSelectChat(chat)}
            className="chat-item"
          >
            <div className="chat-participants">{otherParticipantNames}</div>
            <div className="chat-last-message">{chat.lastMessage.content}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatList;
