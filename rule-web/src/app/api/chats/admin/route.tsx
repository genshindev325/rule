import { type NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import ChatMessage from '@/models/chatMessageModel';
import ChatContact from '@/models/chatContactModel';
import User from '@/models/userModel';
import Store from '@/models/storeModel';
const adminId = '123456789012345678901234';

export async function GET() {
  await dbConnect();
  try {
    const contacts = await ChatContact.find({ responsor: adminId }).exec();
    const chatsWithMessages = await Promise.all(
      contacts.map(async (contact) => {
        let contactName = '';
        let avatar = '';
        if (contact.relationship.toString() === 'a-u') {
          const user = await User.findById(contact.requester).exec();
          if (user) {
            contactName = user.nickname || 'unknown user';
            avatar = user.avatar || '/image/minion.png';
          } else {
            contactName = 'unknow user';
            avatar = '/image/minion.png';
          }
        } else if (contact.relationship.toString() === 'a-s') {
          const store = await Store.findById(contact.requester).exec();
          if (store) {
            contactName = store.storeName || 'unkwon store';
            avatar = store.storeImages[0] || '/image/minion.png';
          } else {
            contactName = 'unknow store';
            avatar = '/image/minion.png';
          }
        }

        // Fetch the related messages
        const messages = await ChatMessage.find({
          requester: contact.requester,
          responsor: adminId,
        })
          .sort({ createdAt: 1 })
          .exec();       
        
        return {
          id: contact.requester,
          name: contactName,
          date: messages.length > 0 ? new Date(messages[messages.length - 1].createdAt).toISOString().split('T')[0] : '',
          lastMessage: messages.length ? messages[messages.length - 1].message : '',
          avatar,
          messages,
          relationship: contact.relationship,
          waitingForReply: contact.waitingForReply
        }
      })
    );

    return NextResponse.json({ success: true, chats: chatsWithMessages });
  } catch (error) {
    console.error('Error fetching chats: ', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch chats' });
  }
}

export async function PUT(req: NextRequest) {
  await dbConnect();
  const body = await req.json();
  const { requester, message } = body;

  // Validate incoming data
  if (!requester || !message) {
    return NextResponse.json(
      {
        success: false,
        error: 'All fields (requester, message) are required.',
      },
      { status: 400 } // Bad Request
    );
  }

  try {
    // Check if the contact entry already exists
    const existingContact = await ChatContact.findOne({
      responsor: adminId,
      requester: requester,
    });

    if (!existingContact) {
      // Create a new chat contact if it does not exist
      return NextResponse.json({success: false, error: 'Requester does not exist'}, {status: 404})
    } else {
      // Update existing contact's last message and date
      existingContact.lastMessage = message;
      existingContact.lastMessageDate = new Date();
      existingContact.waitingForReply = false;
      await existingContact.save();
    }

    // Create a new chat message
    if (existingContact.relationship === 'a-s') {
      const chatMessage = await ChatMessage.create({
        responsor: adminId,
        requester: requester,
        relationship: 'a-s-s',
        message: message,
        createdAt: new Date(), // Ensure you have a createdAt field in your message model
      });
      return NextResponse.json({ success: true, data: chatMessage }, { status: 201 });
    } else if (existingContact.relationship === 'a-u') {
      const chatMessage = await ChatMessage.create({
        responsor: adminId,
        requester: requester,
        relationship: 'a-u-s',
        message: message,
        createdAt: new Date(), // Ensure you have a createdAt field in your message model
      });
      return NextResponse.json({ success: true, data: chatMessage }, { status: 201 });
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error creating chat message:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'An error occurred while creating the chat message.',
      },
      { status: 500 } // Internal Server Error
    );
  }
}
