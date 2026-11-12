import type { Metadata } from 'next';
import Link from 'next/link';
import { Arrow, Cta, PageHero, SectionTitle } from '@/components/ui';
import { leadHref } from '@/lib/data';

export const metadata: Metadata = {
  title: 'О компании',
  description: 'TermoClimat — инженерные системы для частных домов, коммерческих объектов и предприятий Кыргызстана. Официальные дистрибьюторы, 9+ лет на рынке.',
};

const stats = [
  { value: '9+', label: 'лет на рынке' },
  { value: '4', label: 'инженерных направления' },
  { value: '7', label: 'этапов — от проекта до сервиса' },
  { value: 'KG', label: 'официальные дистрибьюторы в Кыргызстане' },
];

const workSteps = [
  { title: 'Изучаем исходные данные', text: 'Назначение объекта, планировка, потребление энергии и требования к системе.' },
  { title: 'Согласуем решение', text: 'Техническая схема, комплектация, состав работ и сроки.' },
  { title: 'Монтаж, запуск и обслуживание', text: 'Этапы и условия фиксируем в согласованном составе работ.' },
];

const certs = [
  { src: '/assets/sert/longi.webp', label: 'Авторизация LONGi · 2026' },
  { src: '/assets/sert/1.jpg', label: 'Документ 1' },
  { src: '/assets/sert/2.jpg', label: 'Документ 2' },
  { src: '/assets/sert/3.jpg', label: 'Документ 3' },
];

export default function AboutPage() {
  return (
    <>
      <PageHero crumb="О компании" title="Инженерия." soft="От задачи до работающей системы.">
        <p className="reveal">TermoClimat — инженерные системы для частных домов, коммерческих объектов и предприятий в Кыргызстане.</p>
      </PageHero>

      <section className="section" style={{ paddingTop: 20 }}>
        <div className="wrap split">
          <div className="photo-stack reveal">
            <img src="/assets/projects/37.webp" alt="Солнечная электростанция, офис 2ГИС" />
            <img src="/assets/projects/39.webp" alt="Солнечная станция в Кумарыке" />
          </div>
          <div className="reveal">
            <span className="mono">О нас</span>
            <h2 style={{ marginTop: 14 }}>Система начинается <span className="soft-l">с понимания объекта.</span></h2>
            <p className="lead">
              Солнечные электростанции, тепловые насосы, вентиляция и очистные сооружения. Работаем с задачами проектирования, подбора
              и поставки оборудования, монтажа, пусконаладки и обслуживания.
            </p>
            <p className="lead" style={{ fontSize: 15 }}>
              Проектируем системы под задачи объекта — дом, офис, склад, ресторан или производство. Подбираем оборудование с учётом
              бюджета, площади, теплопотерь и особенностей эксплуатации. Стоимость, условия оплаты, гарантия и порядок обслуживания
              указываются в предложении и договоре.
            </p>
            <Link className="btn btn-dark" style={{ marginTop: 28 }} href="/projects/">Наши проекты <Arrow /></Link>
          </div>
        </div>
      </section>

      <section className="dark section">
        <div className="wrap">
          <div className="stats">
            {stats.map((s) => <div className="stat reveal" key={s.label}><b>{s.value}</b><span>{s.label}</span></div>)}
          </div>
          <h2 className="title-steal reveal" style={{ marginTop: 100 }}>Работа <span className="soft">над проектом</span></h2>
          <div className="timeline" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
            {workSteps.map((s) => <div className="tl reveal" key={s.title}><h4>{s.title}</h4><p>{s.text}</p></div>)}
          </div>
        </div>
      </section>

      <section className="section" id="certs">
        <div className="wrap">
          <SectionTitle soft="и сертификаты">Партнёры</SectionTitle>
          <div className="grid-2" style={{ marginTop: 56 }}>
            <div className="card reveal">
              <span className="num">LONGi Solar</span>
              <h3>Авторизованный дистрибьютор</h3>
              <p>Письмо об авторизации дистрибьютора выдано Green Horizont LLC на период с августа по декабрь 2026 года.</p>
              <a className="more" href="/assets/sert/longi.webp" target="_blank" rel="noopener">Открыть письмо LONGi <Arrow /></a>
            </div>
            <div className="card reveal">
              <span className="num">Организации и объекты</span>
              <h3>Нам доверяют</h3>
              <p>Офис 2ГИС, школа села Карабулак и Токмокская школа-интернат представлены в портфолио солнечных электростанций.</p>
              <Link className="more" href="/projects/">Смотреть объекты <Arrow /></Link>
            </div>
          </div>
          <div className="certs">
            {certs.map((c) => (
              <a className="cert reveal" href={c.src} target="_blank" rel="noopener" key={c.src}>
                <img loading="lazy" src={c.src} alt={c.label} />
                <span>{c.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Cta title="Обсудим" accent="ваш объект?" text="Для дома, офиса или производства — начнём с исходных данных." button="Обсудить объект" href={leadHref()} />
    </>
  );
}
