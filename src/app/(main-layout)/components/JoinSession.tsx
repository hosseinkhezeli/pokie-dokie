'use client';
import React from 'react';

import { User } from '@/types/common.types';
import Button from '@/components/ui/button/Button';
import { TextInput } from '@/components/ui/input/TextInput';
import { useForm } from 'react-hook-form';
import { useQueryParams } from '@/hooks/useQueryParams';
import { SEARCH_PARAMS_KEYS } from '@/lib/consts';
import { EnterIcon } from '@/lib/icons/Enter';

interface JoinSessionProps {
  onJoin: (sessionId: string, user: User) => void;
  isLoading: boolean;
}

interface IJoinForm {
  sessionId: string;
  user: User;
}

const JoinSession: React.FC<JoinSessionProps> = ({ onJoin, isLoading }) => {
  const { addQueryParam } = useQueryParams();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IJoinForm>();

  const onSubmit = (data: IJoinForm) => {
    onJoin(data?.sessionId, data.user);
  };

  const handleNavigateRoCreate = () => {
    addQueryParam(SEARCH_PARAMS_KEYS.dialogMode, 'create');
  };

  return (
    <div className='animate-slide-in'>
      <h2 className='text-display-sm mb-6 font-black'>کلید داری؟</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className='flex flex-col gap-6'
      >
        <TextInput
          label='کلید نشست'
          {...register('sessionId', {
            required: 'کلید نشست اجباریه!',
          })}
          error={errors.sessionId?.message}
          autoComplete='session id'
          aria-invalid={!!errors.sessionId}
        />

        <Button type='submit' disabled={isLoading} className='w-max'>
          {isSubmitting ? 'در حال ورود...' : 'ورود'} <EnterIcon />
        </Button>
      </form>

      <div className='mt-4 text-body-md'>
        <span className=''>کلید نشست رو نداری؟</span>{' '}
        <button
          className='text-tertiary underline underline-tertiary cursor-pointer'
          onClick={handleNavigateRoCreate}
        >
          نشست جدید بساز
        </button>
      </div>
    </div>
  );
};

export default JoinSession;
