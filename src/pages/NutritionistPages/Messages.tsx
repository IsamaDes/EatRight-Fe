import React, { useEffect, useState } from "react";
import { getChatMessages, Message } from "../../services/chatService";
import { getNutritionistProfile } from "../../services/nutritionistService";
import { initSocket, ClientSocket } from "../../sockets/socket";

const Messages = () => {
  const [nutritionistName, setNutritionistName] = useState("");
  const socketRef = React.useRef<ClientSocket | null>(null);
  const [roomJoined, setRoomJoined] = useState(false);
  const [clientName, setClientName] = useState("");
  const [currentUserId, setCurrentUserId] = useState("");
  const [clientId, setClientId] = useState("");
  const [textInput, setTextInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  /* ------------------ Fetch nutritionist profile ------------------ */
  useEffect(() => {
    const fetchProfile = async () => {
      const response = await getNutritionistProfile();
      setCurrentUserId(response.profile.userId);
      setNutritionistName(response.name);

      const firstClient = response.profile.clients[0];
      if (firstClient) {
        setClientId(firstClient.user.id);
        setClientName(firstClient.user.name);
      }
    };

    fetchProfile();
  }, []);

  /* ------------------ Fetch chat history ------------------ */
  useEffect(() => {
    if (!clientId) return;
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const data = await getChatMessages(clientId);
        setMessages(data);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, [clientId]);

  /* ------------------ Socket listeners ------------------ */
  useEffect(() => {
    if (!currentUserId || !clientId) return;

    const socket = initSocket();
    socketRef.current = socket;

    const joinRoom = () => {
       const payload = { userId: currentUserId, receiverId: clientId };
      socket.emit("join_room", payload);
      setRoomJoined(true);
      console.log("Joined room", payload);
    };

     if (socket.connected) {
    joinRoom();
  } else {
    socket.on("connect", joinRoom);
  }

    socket.on("new_message", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("connect", joinRoom);
      socket.off("new_message");
    };
  }, [currentUserId, clientId]);

  /* ------------------ Send message ------------------ */
  const handleSendMessage = () => {
    if (!textInput.trim() || !clientId || !socketRef.current || !roomJoined) return;

    socketRef.current.emit("sendMessage", {
      senderId: currentUserId,
      receiverId: clientId,
      message: textInput,
      messageType: "text",
    });

    setTextInput("");
  };

  /* ------------------ Disconnect socket ------------------ */
  useEffect(() => {
    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, []);

  /* ------------------ UI ------------------ */
  return (
    <div className="flex h-[85vh] bg-[#f5f6f8] rounded-2xl overflow-hidden shadow-md border">

      {/* LEFT PANEL */}
      <div className="w-1/3 bg-white border-r p-6 flex flex-col gap-6">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-400">Nutritionist</p>
          <p className="text-lg font-semibold text-gray-900">{nutritionistName || "—"}</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-gray-400">Client</p>
          <p className="text-lg font-semibold text-gray-900">{clientName || "—"}</p>
        </div>

        <div className="mt-auto text-xs text-gray-400">
          Secure, private conversation
        </div>
      </div>

      {/* CHAT PANEL */}
      <div className="flex flex-col flex-1 bg-white">

        {/* HEADER */}
        <div className="px-6 py-4 border-b">
          <p className="text-sm text-gray-500">Chatting with</p>
          <p className="text-base font-semibold text-gray-900">{clientName}</p>
        </div>

        {/* MESSAGES */}
        <div className="flex-1 px-6 py-4 overflow-y-auto space-y-4 bg-[#fafafa]">
          {loading ? (
            <p className="text-center text-gray-400 text-sm">Loading messages…</p>
          ) : messages.length === 0 ? (
            <p className="text-center text-gray-400 text-sm">No messages yet</p>
          ) : (
            messages.map((msg) => {
              const isIncoming = msg.senderId === clientId;

              return (
                <div
                  key={msg.id}
                  className={`flex ${isIncoming ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      isIncoming
                        ? "bg-white border border-gray-200 text-gray-900"
                        : "bg-gray-900 text-white"
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* INPUT */}
        <div className="border-t px-4 py-3 bg-white">
          <div className="flex items-center gap-3">
            <input
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Write a message…"
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
            <button
              onClick={handleSendMessage}
              className="px-5 py-3 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;










