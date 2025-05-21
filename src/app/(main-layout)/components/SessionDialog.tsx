'use client';

import Modal from '@/components/ui/modal/Modal';
import { useQueryParams } from '@/hooks/useQueryParams';
import { SEARCH_PARAMS_KEYS } from '@/lib/consts';
import { useSearchParams } from 'next/navigation';
import JoinSession from './JoinSession';
import { Session, User } from '@/types/common.types';
import CreateSession from './CreateSession';

export function SessionDialog() {
  const { removeQueryParam } = useQueryParams();
  const searchParams = useSearchParams();
  const dialogMode = searchParams.get(SEARCH_PARAMS_KEYS.dialogMode);
  const handleCloseDialog = () => {
    removeQueryParam(SEARCH_PARAMS_KEYS.dialogMode);
  };
  return (
    <Modal isOpen={Boolean(dialogMode)} onClose={handleCloseDialog}>
      <section className='p-6 min-h-[250px] '>
        {dialogMode === 'join' && (
          <JoinSession
            onJoin={function (sessionId: string, user: User): void {
              throw new Error('Function not implemented.');
            }}
            isLoading={false}
          />
        )}
        {dialogMode === 'create' && (
          <CreateSession
            onCreate={function (sessio: Session, user: User): void {
              throw new Error('Function not implemented.');
            }}
            isLoading={false}
          />
        )}
      </section>
    </Modal>
  );
}
