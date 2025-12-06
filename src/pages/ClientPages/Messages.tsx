import React, { useState, useEffect, useRef } from 'react';
import { getChatMessages, sendMessage } from '../../services/chatService';
import { io } from "socket.io-client";


interface Receiver {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  role?: string;
  message?: string;
  delivered?: boolean;
  image?: string;
}

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  message: string;
  message_type: string;
  created_at?: string;
}

interface ChatContainers {
  adminChats: Message[];
  nutrionistChats: Message[];
}

const ChatSpace = () => {
  const socket = io("http://localhost:5000");
  const [chatContainers, setChatContainers] = useState<ChatContainers>({
    adminChats: [],
    nutrionistChats: [],
  });
  const [filterType, setFilterType] = useState<'admin' | 'nutritionist'>('admin');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loadingMessages, setLoadingMessages] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [receivers, setReceivers] = useState<Receiver[]>([]);
  const [selectedReceiverId, setSelectedReceiverId] = useState<string | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState('');

  const userId =
    typeof window !== 'undefined' ? localStorage.getItem('userId') : null;

    // Join user's personal room
  socket.emit("join_room", userId); 

  // Listen for incoming messages
socket.on("new_message", (msg) => {
  if (msg.sender_id === userId) return;
  if (msg.sender_id === selectedReceiverId) {
    setChatContainers(prev => ({
      ...prev,
      [filterType === "admin" ? "adminChats" : "nutrionistChats"]: [
        ...prev[filterType === "admin" ? "adminChats" : "nutrionistChats"],
        msg,
      ]
    }));
  }
});
 
  const onSelectReceiver = (id: string) => setSelectedReceiverId(id);

  const fetchAndSetReceivers = async (type: 'admin' | 'nutritionist') => {


    setLoading(true);
    try {
      if (type === 'admin') {
        const res = await fetchAdmins();
        if (res.success) {
          const admins = res.data.users.filter(
            (u: any) => u.user_type === 'admin'
          );
          const formatted = admins.map((admin: any) => ({
            id: admin.id,
            name: `${admin.first_name} ${admin.last_name}`,
            email: admin.email,
            phone: admin.phone_number || 'N/A',
            status: admin.status || 'Unknown',
            role: 'Admin',
            image: '/default-user.svg',
            message: '',
            delivered: true,
          }));
          setReceivers(formatted);
          if (!selectedReceiverId && formatted.length > 0) {
            setSelectedReceiverId(formatted[0].id);
          }
        }
      } else {
        const res = await fetchNutriionists();
        if (res.success) {
          const formatted = res.data.rows.map((c: any) => ({
            id: c.id,
            name: `${c.first_name || ''} ${c.last_name || ''}`.trim(),
            email: c.email,
            phone: c.phone_number || 'N/A',
            status: c.status || 'Unknown',
            role: 'Nutrionist',
            image: '/default-user.svg',
            message: '',
            delivered: true,
          }));
          setReceivers(formatted);
          if (!selectedReceiverId && formatted.length > 0) {
            setSelectedReceiverId(formatted[0].id);
          }
        }
      }
    } catch (err) {
      console.error('Error fetching receivers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAndSetReceivers(filterType);
  }, [filterType]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!userId || !selectedReceiverId) return;
      setLoadingMessages(true);
      try {
        const fetched = await getChatMessages(userId, selectedReceiverId);
        setChatContainers((prev) => ({
          ...prev,
          [filterType === 'admin' ? 'adminChats' : 'nutrtionistChats']:
            fetched as Message[],
        }));
        // setMessages(fetched);
      } catch (err) {
        console.error('Fetch messages failed:', err);
      } finally {
        setLoadingMessages(false);
      }
    };
    fetchMessages();
    // const interval = setInterval(fetchMessages, 5000);
    // return () => clearInterval(interval);
  }, [selectedReceiverId, userId, filterType]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (
      !userId ||
      !selectedReceiverId ||
      !newMessage.trim()
    )
      return;
    try {
      const sentMessage: Message = await sendMessage({
        senderId: userId,
        receiverId: selectedReceiverId,
        message: newMessage.trim(),
        messageType: 'text',
      });
      setChatContainers((prev) => {
        const updated = {
          ...prev,
          [filterType === 'admin' ? 'adminChats' : 'nutrionistChats']: [
            ...prev[filterType === 'admin' ? 'adminChats' : 'nutrionistChats'],
            sentMessage as Message,
          ],
        };
        return updated;
      });
      // setMessages(prev => [...prev, sentMessage]);
      setNewMessage('');
    } catch (err) {
      console.error('Send error:', err);
    }
  };

  const formatTimestamp = (timestamp?: string) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const filteredReceivers = receivers.filter((r) =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeMessages = [
    ...chatContainers[
      filterType === 'admin' ? 'adminChats' : 'nutrionistChats'
    ],
  ].sort(
    (a, b) =>
      new Date(a.created_at!).getTime() - new Date(b.created_at!).getTime()
  );

  return (
    <div className="flex w-full h-full">
      <div className="flex flex-col w-[30%] p-4 border-r border-gray-200">
        <div className="flex justify-between mb-4">
          <div className="flex gap-3 items-center">
            <div className="text-lg font-semibold">Messaging</div>
            <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {filteredReceivers.length}
            </div>
          </div>
          <div className="relative inline-block" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center gap-1 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              Agents
              <img
                src="/agentsort.svg"
                alt="Sort Icon"
                width={20}
                height={20}
              />
            </button>
            {dropdownOpen && (
              <div className="absolute z-10 mt-1 right-0 w-32 bg-white border border-gray-300 rounded shadow-lg">
                <button
                  onClick={() => {
                    setFilterType('admin');
                    setDropdownOpen(false);
                  }}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                >
                  Admins
                </button>
                <button
                  onClick={() => {
                    setFilterType('nutritionist');
                    setDropdownOpen(false);
                  }}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                >
                  Nutrionists
                </button>
              </div>
            )}
          </div>
        </div>

        <div>
          {loading ? (
            <div className="text-center py-4 text-gray-500">Loading...</div>
          ) : filteredReceivers.length > 0 ? (
            <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
              {filteredReceivers.map((r) => (
                <div
                  key={r.id}
                  onClick={() => onSelectReceiver(r.id)}
                  className={`flex items-start gap-3 py-3 border-b border-gray-200 cursor-pointer ${selectedReceiverId === r.id ? 'bg-green-100' : ''}`}
                >
                  <img
                    src={r.image || '/default-user.svg'}
                    alt={r.name}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                  <div className="flex flex-col flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{r.name}</div>
                      <div className="text-xs text-gray-500">{r.role}</div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{r.message}</span>
                      <span>
                        {r.delivered ? (
                          <img
                            src="/bluetick.svg"
                            alt="Delivered"
                            width={16}
                            height={16}
                          />
                        ) : (
                          <img
                            src="/reddot.svg"
                            alt="Unread"
                            width={12}
                            height={12}
                          />
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">
              No receivers found.
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col w-[70%] p-4 bg-[#F3FFED] rounded-lg">
        <div className="flex-1 overflow-y-auto p-4 text-black">
          {loadingMessages ? (
            <div className="text-center text-gray-500">Loading messages...</div>
          ) : activeMessages.length === 0 ? (
            <p className="text-gray-500 text-center">
              No messages yet. Start the conversation!
            </p>
          ) : (
            activeMessages.map((msg, index) => {
              const currentDate = new Date(msg.created_at!);
              const previousMsg = activeMessages[index - 1];
              const previousDate = previousMsg
                ? new Date(previousMsg.created_at!)
                : null;

              const isNewDay =
                !previousDate ||
                currentDate.toDateString() !== previousDate.toDateString();

              const now = new Date();
              const today = new Date(now.setHours(0, 0, 0, 0));
              const yesterday = new Date(today);
              yesterday.setDate(today.getDate() - 1);

              let dateLabel = currentDate.toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              });

              if (currentDate.toDateString() === today.toDateString()) {
                dateLabel = 'Today';
              } else if (
                currentDate.toDateString() === yesterday.toDateString()
              ) {
                dateLabel = 'Yesterday';
              }

              return (
                <React.Fragment key={msg.id}>
                  {isNewDay && (
                    <div className="text-center text-xs text-gray-600 my-4">
                      <span className="inline-block bg-gray-200 px-3 py-1 rounded-full">
                        {dateLabel}
                      </span>
                    </div>
                  )}
                  <div
                    className={`mb-3 flex ${
                      msg.sender_id === userId
                        ? 'justify-end'
                        : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[75%] p-3 text-sm shadow-sm ${
                        msg.sender_id === userId
                          ? 'bg-[#DCF8C6] text-black rounded-xl rounded-br-none'
                          : 'bg-white text-black rounded-xl rounded-bl-none'
                      }`}
                    >
                      <div>{msg.message}</div>
                      <div className="text-[11px] text-gray-500 mt-1 text-right">
                        {formatTimestamp(msg.created_at)}
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className=" flex gap-3 items-center justify-between p-2 border-t border-gray-300 bg-white rounded-b-lg">
          <img
            src="/messageicon.svg"
            alt="Message icon"
            width={24}
            height={24}
          />
          <div className="flex justify-between gap-3 bg-[#F7F7FD] border rounded-2xl w-[90%] p-1">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 bg-transparent outline-none px-4 text-black"
            />
            <div className="flex border rounded-full items-center border-black p-1 cursor-pointer">
              <img
                src="/attachments.svg"
                alt="Attachment icon"
                width={24}
                height={24}
              />
            </div>
          </div>
          <button
            type="button"
            onClick={handleSendMessage}
            className="bg-[#4EBA53] border rounded-2xl p-2 cursor-pointer flex items-center justify-center min-w-[40px] min-h-[40px]"
          >
            <img src="/send-icon.svg" alt="Send" width={24} height={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatSpace;
