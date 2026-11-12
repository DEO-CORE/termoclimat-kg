import type { Metadata } from 'next';
import { Suspense } from 'react';
import LeadForm from '@/components/LeadForm';
import { Arrow, PageHero, SectionTitle } from '@/components/ui';
import { contacts, waLink } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Контакты в Бишкеке — адрес, телефон, WhatsApp',
  description: 'TermoClimat: Бишкек, ул. Абдымомунова, 145. Тел. +996 555 660 276, info@termoclimat.kg. Будни 08:00–17:00.',
};

const prepare = [
  'Где находится объект и как он используется',
  'Что нужно: отопление, вентиляция, солнечная станция или очистка стоков',
  'План, фотографии и сроки, если они уже есть',
];

export default function ContactsPage() {
  return (
    <>
      <PageHero crumb="Контакты" title="Обсудим инженерное решение" soft="для вашего объекта.">
        <p className="reveal">
          <a href={contacts.phoneHref} style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-.03em', color: 'var(--ink)' }}>{contacts.phone}</a>
        </p>
      </PageHero>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap contact-grid">
          <div style={{ display: 'grid', gap: 16, alignContent: 'start' }}>
            <div className="c-card reveal">
              <span className="mono">Встретимся в Бишкеке</span>
              <span className="big">{contacts.street}</span>
              <p>Понедельник — пятница, 08:00–17:00. Суббота и воскресенье — выходные.</p>
              <a className="btn btn-ghost" href={contacts.route} target="_blank" rel="noopener">Построить маршрут в 2ГИС <Arrow /></a>
            </div>
            <div className="grid-2">
              <div className="c-card reveal">
                <span className="mono">Позвоните</span>
                <a className="big" href={contacts.phoneHref}>{contacts.phone}</a>
                {contacts.phones.map((p, i) => (
                  <a key={p.href} className="big" style={{ fontSize: 18, marginTop: i === 0 ? 6 : 0 }} href={p.href}>{p.label}</a>
                ))}
              </div>
              <div className="c-card reveal">
                <span className="mono">Напишите</span>
                <a className="big" style={{ fontSize: 20 }} href={`mailto:${contacts.email}`}>{contacts.email}</a>
                <a className="btn btn-dark" href={waLink()} target="_blank" rel="noopener">WhatsApp <Arrow /></a>
              </div>
            </div>
            <div className="c-card reveal">
              <span className="mono">Что подготовить</span>
              <ul className="ticks" style={{ marginTop: 0 }}>{prepare.map((p) => <li key={p}>{p}</li>)}</ul>
            </div>
          </div>

          <div className="reveal">
            {/* useSearchParams внутри формы требует Suspense при статическом экспорте */}
            <Suspense fallback={null}>
              <LeadForm />
            </Suspense>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }} id="delivery">
        <div className="wrap">
          <SectionTitle soft="и оплата">Доставка</SectionTitle>
          <p className="section-lead reveal">Условия поставки согласуем при подготовке заказа.</p>
          <div className="grid-2" style={{ marginTop: 48 }}>
            <div className="card reveal">
              <span className="num">01 · Доставка</span><h3>По Бишкеку и регионам</h3>
              <p>Сообщите адрес объекта и состав заказа. Менеджер уточнит возможность доставки, стоимость, сроки и условия разгрузки до подтверждения заказа.</p>
            </div>
            <div className="card reveal">
              <span className="num">02 · Оплата</span><h3>По счёту или договору</h3>
              <p>Способ оплаты, получатель и реквизиты указываются в согласованном счёте или договоре. Уточните их у менеджера перед переводом.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-sm" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="map reveal">
            <iframe title="TermoClimat на карте" loading="lazy" src="https://www.openstreetmap.org/export/embed.html?bbox=74.555%2C42.860%2C74.640%2C42.900&layer=mapnik" />
          </div>
        </div>
      </section>
    </>
  );
}
