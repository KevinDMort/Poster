import { connection, generateID } from './connection.js';
import {getUserByID} from './users.js'


export async function getMessageByConversationId(conversationID){
    try {
        const message = await connection('messages').first().where({conversationID})
        return message || null;
      } catch (error) {
        console.error('Error fetching message by ID:', error);
        throw new Error('Error fetching message');
      }

}

export async function saveMessageToDatabase(message){
    const newMessage = {
        
        ...message,
        id: generateID(), 
    }
    try {
        await connection('messages').insert(newMessage);
    }
    catch (error){
        console.error('error saving message to database', error);
        throw new Error('Error saving message');
    }
    return newMessage;

}

export async function getMessagesByConversationId(conversationID) {
    try {
      const messages = await connection('messages').where({ conversationID });
      return messages;
    } catch (error) {
      console.error('Error fetching messages by conversation ID:', error);
      throw new Error('Error fetching messages');
    }
  }

  export const getChats = async (userId) => {
    try {
      const conversations = await connection('messages')
        .select('conversationID')
        .where('senderID', userId)
        .orWhere('receiverID', userId)
        .distinct('conversationID');
  
      const chatDetails = await Promise.all(
        conversations.map(async (conversation) => {
          const lastMessage = await connection('messages')
            .where('conversationID', conversation.conversationID)
            .orderBy('timestamp', 'desc')
            .first();
  
          // Fetch participants' details
          const sender = await getUserByID(lastMessage.senderID);
          const receiver = await getUserByID(lastMessage.receiverID);
  
          if (!sender || !receiver) {
            console.error('Error fetching participants:', { sender, receiver });
            throw new Error('Error fetching participants');
          }
  
          return {
            id: conversation.conversationID,
            participants: [sender, receiver],
            lastMessage,
          };
        })
      );
  
      return chatDetails;
    } catch (error) {
      console.error('Error fetching chats:', error);
      throw new Error('Error fetching chats');
    }
  };

  export const getLastMessageByChatId = async (chatId) => {
    try {
      const message = await connection('messages')
        .where('conversationID', chatId)
        .orderBy('timestamp', 'desc')
        .first();
      return message;
    } catch (error) {
      console.error('Error fetching last message by chat ID:', error);
      throw new Error('Error fetching last message');
    }
  };