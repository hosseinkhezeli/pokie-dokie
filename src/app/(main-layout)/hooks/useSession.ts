import { useCreateSession, useJoinSession } from '@/services/api/session/hooks';
import { enqueueSnackbar } from 'notistack';

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
    isError: isErrorJoinSession,
  } = useJoinSession();
  const {
    mutateAsync: createSessionFn,
    isPending: isPendingCreateSession,
    isError: isErrorCreateSession,
  } = useCreateSession();

  async function handleCreateSession(body: ICreateSessionForm) {
    await createSessionFn(body, {
      onSuccess(data) {
        console.log(data);
      },
      onError() {
        enqueueSnackbar({ variant: 'error', message: 'نشد یه بار دیگه بزن' });
      },
    });
  }

  async function handleJoinSession(body: IJoinSessionForm) {
    await joinSessionFn(body, {
      onSuccess(data) {
        console.log(data);
      },
      onError() {
        enqueueSnackbar({ variant: 'error', message: 'نشد یه بار دیگه بزن' });
      },
    });
  }

  return {
    handleCreateSession,
    handleJoinSession,
    isPendingJoinSession,
    isErrorJoinSession,
    isPendingCreateSession,
    isErrorCreateSession,
  };
}
