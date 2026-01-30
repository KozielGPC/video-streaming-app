import { useState, useEffect, useCallback, useRef } from 'react';
import { Socket } from 'socket.io-client';
import type { ChatMessage } from '@/types';
import {
  connectToChat,
  sendMessage as sendSocketMessage,
  onNewMessage,
  onConnectionChange,
  disconnectChat,
} from '@/services/socket';

interface UseChatResult {
  messages: ChatMessage[];
  sendMessage: (message: string) => void;
  isConnected: boolean;
  error: Error | null;
  clearMessages: () => void;
}

/**
 * Hook to manage real-time chat for a livestream
 * Connects to the chat-service backend via Socket.io
 */
export function useChat(streamId: string, userName?: string): UseChatResult {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const maxReconnectAttempts = 5;

  // Initialize connection
  useEffect(() => {
    if (!streamId) {
      return;
    }

    const initializeSocket = () => {
      try {
        // Clean up existing connection if any
        if (socketRef.current) {
          disconnectChat(socketRef.current);
        }

        // Create new connection
        const socket = connectToChat(streamId);
        socketRef.current = socket;

        // Handle connection status changes
        const cleanupConnectionListener = onConnectionChange(socket, (connected) => {
          setIsConnected(connected);
          
          if (connected) {
            reconnectAttemptsRef.current = 0;
            setError(null);
            console.log(`Connected to chat for stream: ${streamId}`);
          } else {
            // Handle disconnection with auto-reconnect logic
            if (reconnectAttemptsRef.current < maxReconnectAttempts) {
              reconnectAttemptsRef.current += 1;
              console.log(`Reconnecting... Attempt ${reconnectAttemptsRef.current}`);
            } else {
              setError(new Error('Connection lost. Maximum reconnection attempts reached.'));
            }
          }
        });

        // Handle incoming messages from the chat:message event
        const cleanupMessageListener = onNewMessage(socket, (msg) => {
          setMessages((prev) => [...prev, msg]);
        });

        // Handle connection errors
        socket.on('connect_error', (err) => {
          console.error('Socket connection error:', err);
          setError(new Error('Failed to connect to chat server'));
        });

        // Return cleanup function
        return () => {
          cleanupConnectionListener();
          cleanupMessageListener();
          disconnectChat(socket);
          socketRef.current = null;
        };
      } catch (err) {
        console.error('Error initializing socket:', err);
        setError(err instanceof Error ? err : new Error('Failed to initialize chat'));
        return undefined;
      }
    };

    const cleanup = initializeSocket();

    return () => {
      cleanup?.();
    };
  }, [streamId]);

  // Send message function using chat:message event
  const sendMessage = useCallback((message: string) => {
    if (!socketRef.current || !isConnected) {
      console.warn('Cannot send message: not connected');
      return;
    }

    if (!message.trim()) {
      return;
    }

    const displayName = userName || 'You';

    // Create optimistic message for immediate display
    const optimisticMessage: ChatMessage = {
      id: `temp-${Date.now()}`,
      content: message.trim(),
      author: {
        id: 'current-user',
        name: displayName,
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${displayName}`,
        badges: ['subscriber'],
      },
      timestamp: new Date().toISOString(),
    };

    // Add to messages immediately (optimistic update)
    setMessages((prev) => [...prev, optimisticMessage]);

    // Send via socket using chat:message event
    sendSocketMessage(socketRef.current, message.trim(), displayName);
  }, [isConnected, userName]);

  // Clear messages
  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    sendMessage,
    isConnected,
    error,
    clearMessages,
  };
}

/**
 * Hook to get the current socket connection (for advanced usage)
 */
export function useChatSocket(): Socket | null {
  const [socket] = useState<Socket | null>(null);
  
  // This hook could be extended for more advanced socket management
  // if needed, such as direct event emission or custom listeners
  
  return socket;
}
