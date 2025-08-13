import { useCreateSession, useJoinSession } from '@/services/api/session/hooks';

export interface ICreateSessionForm {
  name: string;
}

export interface IJoinSessionForm {
  sessionId: string;
}

export function useSession() {
  const {
    mutateAsync: joinSessionFn,
    isPending: isPendingJoinSession,
    error: joinSessionError,
  } = useJoinSession();
  const {
    mutateAsync: createSessionFn,
    isPending: isPendingCreateSession,
    error: createSessionError,
  } = useCreateSession();

  async function handleCreateSession(body: ICreateSessionForm) {
    await createSessionFn(body, {
      onSuccess(data) {
        console.log(data);
      },
    });
  }

  async function handleJoinSession(body: IJoinSessionForm) {
    await joinSessionFn(body, {
      onSuccess(data) {
        console.log(data);
      },
    });
  }

  return {
    handleCreateSession,
    handleJoinSession,
    isPendingJoinSession,
    joinSessionError,
    isPendingCreateSession,
    createSessionError,
  };
}
