import type { Metadata } from 'next';
import Link from 'next/link';
import { Arrow, Cta, PageHero, SectionTitle } from '@/components/ui';
import { leadHref, services, startSteps } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Инженерные услуги',
  description: 'Проектирование, подбор оборудования, монтаж, пусконаладка, сервис и энергоаудит инженерных систем в Кыргызстане.',
};

export default function ServicesPage() {
  return (
    <>
      <PageHero crumb="Услуги" title="От исходных данных" soft="до работающей системы">
        <p className="reveal">Состав работ согласуем под ваш объект — можно заказать отдельный этап или весь цикл под ключ.</p>
      </PageHero>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="grid-3">
            {services.map((s, i) => (
              <Link className="card reveal" href={leadHref(s.title)} key={s.title}>
                <span className="num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <span className="more">Обсудить задачу <Arrow /></span>
              </Link>
            ))}
          </div>
          <Link
            className="card dark-card reveal"
            style={{ marginTop: 16, flexDirection: 'row', alignItems: 'center', gap: 30, flexWrap: 'wrap' }}
            href={leadHref('Решение под ключ')}
          >
            <div style={{ flex: 1, minWidth: 260 }}>
              <span className="num" style={{ color: 'var(--dark-muted)' }}>07</span>
              <h3 style={{ marginTop: 14 }}>Решения под ключ</h3>
              <p>Ведём объект от исходных данных и проектирования до монтажа, запуска и сервиса.</p>
            </div>
            <span className="btn btn-light">Обсудить объект <Arrow /></span>
          </Link>
        </div>
      </section>

      <section className="dark section">
        <div className="wrap">
          <SectionTitle className="title-steal" soft="работу">Как начать</SectionTitle>
          <div className="timeline">
            {startSteps.map((s) => <div className="tl reveal" key={s.title}><h4>{s.title}</h4><p>{s.text}</p></div>)}
          </div>
        </div>
      </section>

      <div style={{ height: 70 }} />
      <Cta title="Есть объект?" accent="Начнём с данных." text="Пришлите план и фото — подготовим решение и состав работ." button="Обсудить проект" href={leadHref()} />
    </>
  );
}
