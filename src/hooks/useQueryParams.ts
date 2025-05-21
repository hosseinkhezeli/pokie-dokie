'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function useQueryParams() {
  const router = useRouter();
  const pathname = usePathname();
  const localSearchParam = useSearchParams();

  const addQueryParam = (
    key: string | string[],
    value: any,
    searchParams?: string
  ) => {
    const params = new URLSearchParams(
      searchParams ?? localSearchParam.toString()
    );
    if (Array?.isArray(key) && Array?.isArray(value)) {
      key?.forEach((key, idx) => {
        params.set(key, value[idx]);
      });
    } else {
      params.set(key as string, value as string);
    }

    router.push(pathname + '?' + params.toString());
  };

  const removeQueryParam = (keyToRemove: string, searchParams?: string) => {
    const params = new URLSearchParams(
      searchParams ?? localSearchParam.toString()
    );

    params.delete(keyToRemove);

    const queryString = params.toString();

    router.push(pathname + (queryString ? '?' + queryString : ''));
  };

  const resetQueryParams = () => {
    router.push(pathname);
  };

  return { addQueryParam, removeQueryParam, resetQueryParams };
}
