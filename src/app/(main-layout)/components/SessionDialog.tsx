'use client';

import Modal from '@/components/ui/modal/Modal';
import { useQueryParams } from '@/hooks/useQueryParams';
import { SEARCH_PARAMS_KEYS } from '@/lib/consts';
import { useSearchParams } from 'next/navigation';
import { JoinSession } from './JoinSession';
import { CreateSession } from './CreateSession';
import { useCallback } from 'react';

export function SessionDialog() {
  const { removeQueryParam } = useQueryParams();
  const searchParams = useSearchParams();

  const dialogMode = searchParams.get(SEARCH_PARAMS_KEYS.dialogMode);

  const handleCloseDialog = () => {
    removeQueryParam(SEARCH_PARAMS_KEYS.dialogMode);
  };

  const getForm = useCallback(
    (formMode: 'join' | 'create') => {
      switch (formMode) {
        case 'join':
          return <JoinSession />;
        case 'create':
          return <CreateSession />;
      }
    },
    [dialogMode]
  );

  return (
    <Modal isOpen={dialogMode} onClose={handleCloseDialog}>
      <section className='p-6 min-h-[250px] '>
        {getForm(dialogMode as 'join' | 'create')}
      </section>
    </Modal>
  );
}
