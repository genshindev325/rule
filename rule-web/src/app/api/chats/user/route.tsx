import { type NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import ChatMessage from '@/models/chatMessageModel';
import ChatContact from '@/models/chatContactModel';
import Store from '@/models/storeModel';

export async function POST(req: NextRequest) {
  await dbConnect();

  const body = await req.json();
  const { userId } = body;
  try {
    const adminId = '123456789012345678901234';
    // Check for existing admin contact
    const existingAdminContact = await ChatContact.findOne({
      responsor: adminId, requester: userId
    }).exec();

    if (!existingAdminContact) {
      await ChatContact.create({
        responsor: adminId,
        requester: userId,
        relationship: 'a-u',
        waitingForReply: false
      })
    }

    const contacts = await ChatContact.find({ requester: userId }).exec();
    const chatsWithMessages = await Promise.all(
      contacts.map(async (contact) => {
        let contactName = '';
        let avatar = '';

        if (contact.relationship === 's-u') {
          const store = await Store.findById(contact.responsor).exec();

          if (store) {
            contactName = store.storeName || 'unknown user';
            avatar = store.storeImages[0] || '/image/minion.png';
          } else {
            contactName = 'unknow user';
            avatar = '/image/minion.png';
          }
        } else {
          contactName = '管理者';
          avatar = '/image/minion.png';
        }

        // Fetch the related messages
        const messages = await ChatMessage.find({
          requester: contact.requester,
          responsor: contact.responsor,
        })
          .sort({ createdAt: 1 })
          .exec();       
        
        return {
          id: contact.responsor,
          name: contactName,
          date: messages.length > 0 ? new Date(messages[messages.length - 1].createdAt).toISOString().split('T')[0] : '',
          lastMessage: messages.length ? messages[messages.length - 1].message : '',
          avatar,
          messages,
          relationship: contact.relationship
        }
      })
    );

    return NextResponse.json({ success: true, chats: chatsWithMessages }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  await dbConnect();
  const body = await req.json();
  const { responsor, requester, message, relationship } = body;

  // Validate incoming data
  if (!responsor || !requester || !message || !relationship) {
    return NextResponse.json(
      {
        success: false,
        error: 'All fields (responsor, requester, message, relationship) are required.',
      },
      { status: 400 } // Bad Request
    );
  }

  try {
    // Check if the contact entry already exists
    const existingContact = await ChatContact.findOne({
      responsor,
      requester,
    });

    if (!existingContact) {
      // Create a new chat contact if it does not exist
      await ChatContact.create({
        responsor,
        requester,
        relationship: 's-u',
        lastMessage: message,
        lastMessageDate: new Date(),
        waitingForReply: true,
      });
    } else {
      // Update existing contact's last message and date
      existingContact.lastMessage = message;
      existingContact.lastMessageDate = new Date();
      existingContact.waitingForReply = true; // Update this as per your logic
      await existingContact.save();
    }

    // Create a new chat message
    const chatMessage = await ChatMessage.create({
      responsor,
      requester,
      relationship,
      message,
      createdAt: new Date().toISOString(), // Ensure you have a createdAt field in your message model
    });

    return NextResponse.json(
      {
        success: true,
        data: chatMessage,
      },
      { status: 201 } // Created
    );
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
