'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { waLink } from '@/lib/data';

const directions = ['Солнечная электростанция', 'Тепловой насос', 'Вентиляция', 'Очистные сооружения', 'Котлы и отопление', 'Другое / не знаю'] as const;
const objects = ['Частный дом', 'Квартира', 'Офис / магазин', 'Гостиница / кафе', 'Производство / склад', 'Школа / соцобъект'] as const;

type LeadData = {
  name: string;
  phone: string;
  type: (typeof directions)[number];
  object: (typeof objects)[number];
  msg: string;
};

const initial: LeadData = { name: '', phone: '', type: directions[0], object: objects[0], msg: '' };

/** Форма заявки: собирает данные и открывает готовое сообщение в WhatsApp. */
export default function LeadForm() {
  const params = useSearchParams();
  const [data, setData] = useState<LeadData>(initial);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const q = params.get('q');
    if (q) setData((d) => ({ ...d, msg: q }));
  }, [params]);

  const update =
    <K extends keyof LeadData>(key: K) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setData((d) => ({ ...d, [key]: e.target.value as LeadData[K] }));

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = [
      'Здравствуйте! Заявка с сайта TermoClimat.',
      `Имя: ${data.name}`,
      `Телефон: ${data.phone}`,
      `Направление: ${data.type}`,
      `Объект: ${data.object}`,
      `Задача: ${data.msg}`,
    ].join('\n');
    window.open(waLink(text), '_blank', 'noopener');
    setSent(true);
  };

  return (
    <form className="form" id="form" onSubmit={onSubmit}>
      <h3>Расскажите о задаче.</h3>
      <p>Для дома, офиса или производства — начнём с исходных данных. Заявка откроется в WhatsApp.</p>
      <div className="form-row">
        <label className="field"><span>Имя</span>
          <input name="name" required autoComplete="name" placeholder="Как к вам обращаться" value={data.name} onChange={update('name')} />
        </label>
        <label className="field"><span>Телефон</span>
          <input name="phone" required type="tel" autoComplete="tel" placeholder="+996 ___ ___ ___" value={data.phone} onChange={update('phone')} />
        </label>
      </div>
      <div className="form-row">
        <label className="field"><span>Направление</span>
          <select name="type" value={data.type} onChange={update('type')}>
            {directions.map((d) => <option key={d}>{d}</option>)}
          </select>
        </label>
        <label className="field"><span>Объект</span>
          <select name="object" value={data.object} onChange={update('object')}>
            {objects.map((o) => <option key={o}>{o}</option>)}
          </select>
        </label>
      </div>
      <label className="field"><span>Задача</span>
        <textarea name="msg" placeholder="Площадь, текущее оборудование, желаемый результат" value={data.msg} onChange={update('msg')} />
      </label>
      <button className="btn btn-light btn-block" type="submit" style={{ height: 52, marginTop: 6 }}>
        Отправить заявку <span className="arrow">↗</span>
      </button>
      {sent && (
        <div className="form-ok" style={{ display: 'block' }} role="status">
          Спасибо! Мы открыли WhatsApp с вашей заявкой — отправьте сообщение, и специалист свяжется с вами.
        </div>
      )}
      <small>Отправляя форму, вы даёте согласие на обработку персональных данных.</small>
    </form>
  );
}
