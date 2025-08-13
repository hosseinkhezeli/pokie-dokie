'use client';
import React from 'react';
import { useQueryParams } from '@/hooks/useQueryParams';
import { useForm } from 'react-hook-form';
import Button from '@/components/ui/button/Button';
import { TextInput } from '@/components/ui/input/TextInput';
import { SEARCH_PARAMS_KEYS } from '@/lib/consts';
import { PlusCircleIcon } from '@/lib/icons/PlusCircle';
import { ICreateSessionForm, useSession } from '../hooks/useSession';

export function CreateSession() {
  const { handleCreateSession, isPendingCreateSession } = useSession();
  const { addQueryParam } = useQueryParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateSessionForm>();

  const onSubmit = (data: ICreateSessionForm) => {
    handleCreateSession(data);
  };

  const handleNavigateToJoin = () => {
    addQueryParam(SEARCH_PARAMS_KEYS.dialogMode, 'join');
  };

  return (
    <div className='animate-slide-in'>
      <h2 className='text-display-sm mb-6 font-black'>بشینیم؟</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className='flex flex-col gap-6'
      >
        <TextInput
          label='نام نشست'
          {...register('name', {
            required: 'نام نشست اجباریه!',
          })}
          error={errors?.name?.message}
          autoComplete='session id'
          aria-invalid={!!errors?.name}
          disabled={isPendingCreateSession}
        />

        <Button
          type='submit'
          loading={isPendingCreateSession}
          className='w-max'
          endIcon={<PlusCircleIcon fill='currentColor' />}
        >
          {isPendingCreateSession ? 'در حال ایجاد ...' : 'ایجاد نشست جدید'}
        </Button>
      </form>

      <div className='mt-4 text-body-md'>
        <span className=''>کلید نشست رو داری؟</span>{' '}
        <button
          className='text-tertiary underline underline-tertiary cursor-pointer'
          onClick={handleNavigateToJoin}
        >
          وارد شو
        </button>
      </div>
    </div>
  );
}
