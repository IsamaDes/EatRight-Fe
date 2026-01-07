
import React, { useEffect, useState } from "react";
import { getClientProfile } from "../../services/clientService";
import { getChatMessages, Message } from "../../services/chatService";
import { initSocket, ClientSocket } from "../../sockets/socket";

const Messages = () => {
  const [client, setClient] = useState("");
  const socketRef = React.useRef<ClientSocket | null>(null);
  const [roomJoined, setRoomJoined] = useState(false);
  const [nutritionist, setNutritionist] = useState("");
  const [currentUserId, setCurrentUserId] = useState("");
  const [nutritionistId, setNutritionistId] = useState("");
  const [textInput, setTextInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  /* ------------------ Load client profile ------------------ */
  useEffect(() => {
    const fetchClientProfile = async () => {
      const response = await getClientProfile();
      setCurrentUserId(response.data.id);

      const clientName = response.data.name;
      const assignedNutritionist = response.data.assignedNutritionist;

      if (assignedNutritionist) {
        setNutritionistId(assignedNutritionist.userId ?? "");
        setNutritionist(assignedNutritionist.user.name ?? "");
      }

      setClient(clientName);
    };

    fetchClientProfile();
  }, []);

  /* ------------------ Fetch chat history ------------------ */
  useEffect(() => {
    if (!nutritionistId) return;

    const fetchMessages = async () => {
      setLoading(true);
      try {
        const response = await getChatMessages(nutritionistId);
        setMessages(response);
      } catch (err) {
        console.error("Error fetching messages", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [nutritionistId]);

  useEffect(() => {
    if (!currentUserId || !nutritionistId) return;

    const socket = initSocket();
    socketRef.current = socket;

    const joinRoom = () => {
      socket.emit("join_room", {
        userId: currentUserId,
        receiverId: nutritionistId,
      });
    setRoomJoined(true);

    };

    // if (socket.connected) joinRoom();
    // socket.on("connect", joinRoom);

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
  }, [currentUserId, nutritionistId]);

  /* ------------------ Send message ------------------ */
  const handleSendMessage = () => {
    if (!textInput.trim() || !nutritionistId || !roomJoined) return;

    const socket = initSocket();
    socket.emit("sendMessage", {
      senderId: currentUserId,
      receiverId: nutritionistId,
      message: textInput,
      messageType: "text",
    });

    setTextInput("");
  };

  /* ------------------ UI ------------------ */
  return (
    <div className="flex h-[85vh] bg-[#f7f8fa] rounded-2xl overflow-hidden shadow-sm border">

      {/* LEFT INFO PANEL */}
      <div className="w-1/3 border-r bg-white p-6 flex flex-col gap-6">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-400">
            Client
          </p>
          <p className="text-lg font-semibold text-gray-900">{client}</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-gray-400">
            Nutritionist
          </p>
          <p className="text-lg font-semibold text-gray-900">
            {nutritionist || "—"}
          </p>
        </div>

        <div className="mt-auto text-xs text-gray-400">
          Secure, private communication
        </div>
      </div>

      {/* CHAT PANEL */}
      <div className="flex flex-col flex-1 bg-white">

        {/* HEADER */}
        <div className="px-6 py-4 border-b">
          <p className="text-sm text-gray-500">
            Conversation with
          </p>
          <p className="text-base font-semibold text-gray-900">
            {nutritionist}
          </p>
        </div>

        {/* MESSAGES */}
        <div className="flex-1 px-6 py-4 overflow-y-auto space-y-4 bg-[#fafafa]">
          {loading ? (
            <p className="text-center text-gray-400 text-sm">
              Loading messages…
            </p>
          ) : messages.length === 0 ? (
            <p className="text-center text-gray-400 text-sm">
              No messages yet
            </p>
          ) : (
            messages.map((msg) => {
              const isIncoming = msg.senderId === nutritionistId;

              return (
                <div
                  key={msg.id}
                  className={`flex ${isIncoming ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      isIncoming
                        ? "bg-white border text-gray-800"
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
