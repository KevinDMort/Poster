import { connection, generateID } from './connection.js';


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
    return message;

}

export async function getMessagesByConversationId(conversationId) {
    try {
      const messages = await connection('messages').where({ conversationId });
      return messages;
    } catch (error) {
      console.error('Error fetching messages by conversation ID:', error);
      throw new Error('Error fetching messages');
    }
  }