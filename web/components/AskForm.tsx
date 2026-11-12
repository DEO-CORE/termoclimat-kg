'use client';

import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { leadHref } from '@/lib/data';

/** Поле «опишите задачу» в hero — переносит текст в форму заявки. */
export default function AskForm() {
  const router = useRouter();
  const [value, setValue] = useState('');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(leadHref(value.trim() || undefined));
  };

  return (
    <form className="ask reveal" role="search" onSubmit={onSubmit}>
      <label className="sr" htmlFor="ask">Опишите задачу</label>
      <input
        id="ask"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Например: дом 180 м², нужен тепловой насос и тёплый пол"
      />
      <button type="submit" aria-label="Отправить">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M8 13V3M8 3L3.5 7.5M8 3l4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </form>
  );
}
