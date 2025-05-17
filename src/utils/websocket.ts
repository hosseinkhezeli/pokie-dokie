import { Session, User, Vote } from "@/types/common.types";



type WebSocketMessage = 
  | { type: 'SESSION_UPDATE'; payload: Session }
  | { type: 'USER_JOIN'; payload: User }
  | { type: 'USER_LEAVE'; payload: string }
  | { type: 'VOTE_CAST'; payload: { storyId: string; vote: Vote } }
  | { type: 'VOTES_REVEAL'; payload: boolean }
  | { type: 'TIMER_START'; payload: { duration: number; endTime: number } }
  | { type: 'TIMER_STOP'; payload: void }
  | { type: 'ERROR'; payload: string };

type WebSocketCallbacks = {
  onSessionUpdate?: (session: Session) => void;
  onUserJoin?: (user: User) => void;
  onUserLeave?: (userId: string) => void;
  onVoteCast?: (storyId: string, vote: Vote) => void;
  onVotesReveal?: (revealed: boolean) => void;
  onTimerStart?: (duration: number, endTime: number) => void;
  onTimerStop?: () => void;
  onError?: (error: string) => void;
  onConnectionChange?: (connected: boolean) => void;
};

/**
 * A WebSocket service for real-time communication in the Poker Planning app.
 * 
 * Note: In a production implementation, this would connect to a real WebSocket server.
 * For the purposes of this demo, we're simulating WebSocket behavior.
 */
export class WebSocketService {
  private ws: WebSocket | null = null;
  private isConnected = false;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectTimeout: NodeJS.Timeout | null = null;
  private callbacks: WebSocketCallbacks = {};
  private sessionId: string | null = null;
  private userId: string | null = null;

  // Connect to WebSocket server
  connect(sessionId: string, userId: string): Promise<boolean> {
    this.sessionId = sessionId;
    this.userId = userId;

    // In a real implementation, this would connect to a WebSocket server
    // For demo purposes, we're simulating WebSocket behavior
    return new Promise((resolve) => {
      // Simulate connection delay
      setTimeout(() => {
        this.isConnected = true;
        if (this.callbacks.onConnectionChange) {
          this.callbacks.onConnectionChange(true);
        }
        resolve(true);
      }, 1000);
    });
  }

  // Disconnect from WebSocket server
  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    
    this.isConnected = false;
    this.sessionId = null;
    this.userId = null;
    
    if (this.callbacks.onConnectionChange) {
      this.callbacks.onConnectionChange(false);
    }
    
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
  }

  // Send message through WebSocket
  send<K extends WebSocketMessage['type']>(type: K, payload: Extract<WebSocketMessage, { type: K }>['payload']): void {
    if (!this.isConnected) {
      console.warn('WebSocket is not connected');
      return;
    }

    // In a real implementation, this would send a message through the WebSocket
    const message = { type, payload } as Extract<WebSocketMessage, { type: K }>;
    console.log('Sending WebSocket message:', message);
    
    // Simulate WebSocket behavior for demo purposes
    this.simulateMessageProcessing(message);
  }

  // Set callbacks for WebSocket events
  setCallbacks(callbacks: WebSocketCallbacks): void {
    this.callbacks = callbacks;
  }

  // Handle incoming messages
  private handleMessage(message: WebSocketMessage): void {
    const { type, payload } = message;
    
    switch (type) {
      case 'SESSION_UPDATE':
        if (this.callbacks.onSessionUpdate) {
          this.callbacks.onSessionUpdate(payload);
        }
        break;
      case 'USER_JOIN':
        if (this.callbacks.onUserJoin) {
          this.callbacks.onUserJoin(payload);
        }
        break;
      case 'USER_LEAVE':
        if (this.callbacks.onUserLeave) {
          this.callbacks.onUserLeave(payload);
        }
        break;
      case 'VOTE_CAST':
        if (this.callbacks.onVoteCast) {
          this.callbacks.onVoteCast(payload.storyId, payload.vote);
        }
        break;
      case 'VOTES_REVEAL':
        if (this.callbacks.onVotesReveal) {
          this.callbacks.onVotesReveal(payload);
        }
        break;
      case 'TIMER_START':
        if (this.callbacks.onTimerStart) {
          this.callbacks.onTimerStart(payload.duration, payload.endTime);
        }
        break;
      case 'TIMER_STOP':
        if (this.callbacks.onTimerStop) {
          this.callbacks.onTimerStop();
        }
        break;
      case 'ERROR':
        if (this.callbacks.onError) {
          this.callbacks.onError(payload);
        }
        break;
      default:
        console.warn(`Unknown message type: ${type}`);
    }
  }

  // Simulate WebSocket message processing for demo purposes
  private simulateMessageProcessing(message: WebSocketMessage): void {
    // In a real implementation, this would be handled by the WebSocket server
    setTimeout(() => {
      // Echo back the message for demo purposes
      this.handleMessage(message);
    }, 500);
  }

  // Check if WebSocket is connected
  isConnectedToServer(): boolean {
    return this.isConnected;
  }
}

// Create a singleton instance for global use
export const websocketService = new WebSocketService();