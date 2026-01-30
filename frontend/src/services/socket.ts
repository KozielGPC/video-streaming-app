import { io, Socket } from 'socket.io-client';
import type { ChatMessage } from '@/types';

const CHAT_WS_URL = import.meta.env.VITE_CHAT_WS_URL || 'http://localhost:3000';

/**
 * Backend chat message format (from chat-service)
 */
interface BackendChatMessage {
  user: string;
  text: string;
  timestamp: number;
}

/**
 * Connect to the chat service for a specific stream
 */
export function connectToChat(streamId: string): Socket {
  const socket = io(CHAT_WS_URL, {
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    timeout: 10000,
    transports: ['websocket', 'polling'],
  });

  // Log connection for debugging
  socket.on('connect', () => {
    console.log(`Connected to chat service for stream: ${streamId}`);
  });

  return socket;
}

/**
 * Send a chat message using the chat:message event
 * Backend expects: { user?: string, text: string }
 */
export function sendMessage(socket: Socket, message: string, userName?: string): void {
  if (!socket.connected) {
    console.warn('Socket not connected. Message not sent.');
    return;
  }

  socket.emit('chat:message', {
    user: userName || 'anonymous',
    text: message,
  });
}

/**
 * Register callback for receiving new messages
 * Backend emits: { user: string, text: string, timestamp: number }
 */
export function onNewMessage(
  socket: Socket,
  callback: (msg: ChatMessage) => void
): () => void {
  const handler = (msg: BackendChatMessage) => {
    // Transform backend message format to frontend ChatMessage format
    const chatMessage: ChatMessage = {
      id: `msg-${msg.timestamp}-${Math.random().toString(36).substr(2, 9)}`,
      content: msg.text,
      author: {
        id: msg.user,
        name: msg.user,
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${msg.user}`,
        badges: [],
      },
      timestamp: new Date(msg.timestamp).toISOString(),
    };
    callback(chatMessage);
  };

  // Listen to chat:message event (backend broadcasts on same event)
  socket.on('chat:message', handler);

  // Return cleanup function
  return () => {
    socket.off('chat:message', handler);
  };
}

/**
 * Register callback for connection status changes
 */
export function onConnectionChange(
  socket: Socket,
  callback: (connected: boolean) => void
): () => void {
  const handleConnect = () => callback(true);
  const handleDisconnect = () => callback(false);
  const handleError = () => callback(false);

  socket.on('connect', handleConnect);
  socket.on('disconnect', handleDisconnect);
  socket.on('connect_error', handleError);

  // Return cleanup function
  return () => {
    socket.off('connect', handleConnect);
    socket.off('disconnect', handleDisconnect);
    socket.off('connect_error', handleError);
  };
}

/**
 * Disconnect from chat service
 */
export function disconnectChat(socket: Socket): void {
  if (socket.connected) {
    socket.disconnect();
  }
}
