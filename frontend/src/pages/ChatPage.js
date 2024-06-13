import { ChatState } from '../context/ChatProvider';

const ChatPage = () => {
  const { user } = ChatState();

  return (
    <div style={{width: "100%"}}>
      {user} okokkokko
    </div>
  )
};

export default ChatPage;