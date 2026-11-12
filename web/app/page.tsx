import Link from 'next/link';
import type { ReactNode } from 'react';
import ArcCarousel from '@/components/ArcCarousel';
import AskForm from '@/components/AskForm';
import SolutionTabs from '@/components/SolutionTabs';
import { Arrow, Cta, SectionTitle } from '@/components/ui';
import { cases, leadHref } from '@/lib/data';

type MediaItem = { href: string; img: string; title: string; sub: string; wide?: boolean; product?: boolean };

const media: MediaItem[] = [
  { href: '/solutions/#solar', img: '/assets/img/solar.jpg', title: 'Солнечные электростанции', sub: 'Панели, инверторы, накопители', wide: true },
  { href: '/projects/', img: '/assets/projects/43.webp', title: 'Токмок', sub: '40 кВт' },
  { href: '/catalog/', img: '/assets/products/SUNPOLO-6KW-01-500x500.jpg', title: 'Инверторы', sub: 'Каталог', product: true },
  { href: '/solutions/#heatpump', img: '/assets/img/heatpump.jpg', title: 'Тепловые насосы', sub: 'Отопление, охлаждение, ГВС', wide: true },
  { href: '/projects/', img: '/assets/projects/40.webp', title: 'Актилек, Ош', sub: '20 кВт' },
  { href: '/catalog/', img: '/assets/products/city_air_8-500x500.png', title: 'Рекуператоры', sub: 'Каталог', product: true },
  { href: '/projects/', img: '/assets/projects/school-ilim.webp', title: 'Школа «Илим»', sub: 'Солнечные панели' },
  { href: '/solutions/#wastewater', img: '/assets/img/wastewater.jpg', title: 'Очистные сооружения', sub: 'Станции по объёму стоков', wide: true },
  { href: '/solutions/#ventilation', img: '/assets/img/ventilation.jpg', title: 'Вентиляция', sub: 'Приток и вытяжка', wide: true },
  { href: '/catalog/', img: '/assets/products/APS-100-500x500.png', title: 'Насосы', sub: 'Каталог', product: true },
  { href: '/projects/', img: '/assets/gallery/23.jpg', title: 'Котельная', sub: 'Котёл, бойлер, обвязка' },
  { href: '/projects/', img: '/assets/gallery/29.jpg', title: 'Турлагерь', sub: 'Автономная СЭС' },
  { href: '/projects/', img: '/assets/gallery/20.jpg', title: 'Частный дом', sub: 'Тепловой насос' },
  { href: '/projects/', img: '/assets/gallery/13.jpg', title: 'Кровельная СЭС', sub: 'Частный дом' },
];

type KitCard = { title: string; text: string; icon: ReactNode; rows: { img: string; label: string; status: string }[] };

const kit: KitCard[] = [
  {
    title: 'Котлы, баки и бойлеры',
    text: 'Газовые и электрические котлы, бойлеры косвенного нагрева и баки — подбор, поставка и установка.',
    icon: <svg viewBox="0 0 20 20" fill="none"><rect x="4" y="2.5" width="12" height="15" rx="2" stroke="currentColor" strokeWidth="1.5" /><circle cx="10" cy="11" r="3" stroke="currentColor" strokeWidth="1.5" /></svg>,
    rows: [
      { img: '/assets/products/termoclimat_boiler-500x500.png', label: 'Котлы отопления', status: 'расчёт' },
      { img: '/assets/products/nemo50_termica_63dbbe3c6a817-500x500.jpeg', label: 'Водонагреватели и бойлеры', status: 'в наличии' },
    ],
  },
  {
    title: 'Насосы',
    text: 'Циркуляционные, повышающие и дренажные насосы для систем отопления и водоснабжения.',
    icon: <svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" /><path d="M10 3v14M3 10h14" stroke="currentColor" strokeWidth="1.5" /></svg>,
    rows: [
      { img: '/assets/products/APS-100-500x500.png', label: 'Насосные станции', status: 'в наличии' },
      { img: '/assets/products/split-65-0-500x500.png', label: 'Климатическое оборудование', status: 'под заказ' },
    ],
  },
  {
    title: 'Вентиляция и очистка',
    text: 'Рекуператоры, приточные клапаны, фильтры и локальные станции очистки сточных вод.',
    icon: <svg viewBox="0 0 20 20" fill="none"><path d="M3 7h14M3 13h14" stroke="currentColor" strokeWidth="1.5" /><circle cx="7" cy="7" r="2" fill="#fff" stroke="currentColor" strokeWidth="1.5" /><circle cx="13" cy="13" r="2" fill="#fff" stroke="currentColor" strokeWidth="1.5" /></svg>,
    rows: [
      { img: '/assets/products/city_air_8-500x500.png', label: 'Рекуператоры и клапаны', status: 'в наличии' },
      { img: '/assets/products/at-new-vfl-500x500.png', label: 'Станции очистки', status: 'подбор' },
    ],
  },
  {
    title: 'Солнечная энергетика',
    text: 'Панели, сетевые и гибридные инверторы, аккумуляторы, автоматика, трубы и фитинги.',
    icon: <svg viewBox="0 0 20 20" fill="none"><path d="M11 2 4 11h5l-1 7 7-9h-5l1-7Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>,
    rows: [
      { img: '/assets/products/SUNPOLO-6KW-01-500x500.jpg', label: 'Инверторы и накопители', status: 'в наличии' },
      { img: '/assets/products/termica_fiting-500x500.png', label: 'Трубы, фитинги, тёплый пол', status: 'в наличии' },
    ],
  },
];

type Plan = { name: string; price: string; unit: string; desc: string; button: string; items: string[]; highlight?: boolean };

const plans: Plan[] = [
  {
    name: 'Консультация', price: 'Подбор', unit: 'оборудования', desc: 'Для тех, кто знает задачу и хочет купить правильно', button: 'Получить подбор',
    items: ['Анализ исходных данных объекта', 'Сравнение моделей по нагрузке и условиям', 'Совместимая комплектация', 'Доставка по Бишкеку и регионам', 'Официальная гарантия производителя'],
  },
  {
    name: 'Проект + монтаж', price: 'Система', unit: 'в работе', desc: 'Для домов, офисов и коммерческих объектов', button: 'Обсудить проект', highlight: true,
    items: ['Всё из «Консультации»', 'Схема и спецификация оборудования', 'Монтаж по проекту', 'Пусконаладка и настройка автоматики', 'Инструкции по эксплуатации'],
  },
  {
    name: 'Под ключ', price: 'Объект', unit: 'целиком', desc: 'Для предприятий, школ, гостиниц', button: 'Запросить расчёт',
    items: ['Всё из «Проект + монтаж»', 'Энергоаудит и оптимизация расходов', 'Ведение объекта от данных до запуска', 'Сервисное обслуживание'],
  },
];

const bars = [82, 74, 58, 38, 22, 16, 14, 18, 30, 52, 70, 90];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <h1 className="reveal">Инженерные системы <span className="soft">для дома и бизнеса</span></h1>
          <p className="hero-sub reveal">
            Солнечные электростанции, тепловые насосы, вентиляция и очистные сооружения. Проектируем, подбираем, монтируем,
            запускаем и обслуживаем — по всему Кыргызстану.
          </p>
          <AskForm />
          <p className="mono hero-note">9+ лет на рынке · официальные дистрибьюторы · Бишкек и регионы</p>
        </div>
        <ArcCarousel />
      </section>

      <section className="dark section">
        <div className="wrap">
          <SectionTitle>Солнце. Тепло. Воздух. Вода.</SectionTitle>
          <p className="section-lead reveal">Четыре инженерных направления в одной команде — от расчёта нагрузки до сервиса после запуска.</p>
          <div className="media-grid reveal">
            {media.map((m) => (
              <Link key={m.img} href={m.href} className={`media${m.wide ? ' wide' : ''}${m.product ? ' product' : ''}`}>
                <img src={m.img} alt={m.title} />
                {m.wide && <span className="media-badge" />}
                <span className="media-cap"><b>{m.title}</b><span>{m.sub}</span></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionTitle soft="— в цифрах наших объектов">Системы, которые окупаются</SectionTitle>
          <div className="cases reveal">
            {cases.map((c) => (
              <article className="case" key={c.who}>
                <div className="case-metric">{c.metric}<small>{c.unit}</small></div>
                <p>{c.text}</p>
                <div className="case-who">
                  <img src={c.img} alt="" />
                  <div><b>{c.who}</b><span>{c.where}</span></div>
                </div>
              </article>
            ))}
          </div>
          <div className="dots" aria-hidden="true"><i /><i className="on" /><i /><i /></div>
        </div>
      </section>

      <section className="dark section">
        <div className="wrap">
          <SectionTitle className="title-steal" soft="Обслуживать.">Рассчитать. Смонтировать.</SectionTitle>
          <p className="section-lead reveal">Инженерия полного цикла — в трёх шагах.</p>
          <div className="features">
            <div className="feature reveal">
              <div className="feature-text">
                <span className="feature-num">01</span>
                <h3>Изучаем объект</h3>
                <p>Назначение, планировка, теплопотери, потребление энергии и требования к системе. Передайте план, фотографии и счета — и мы рассчитаем нагрузку.</p>
                <Link className="btn btn-ghost-dark btn-sm" href={leadHref()}>Передать данные <Arrow /></Link>
              </div>
              <div className="ui">
                <div className="ui-bar"><i /><i /><i /><span>Расчёт · частный дом, 180 м²</span></div>
                <div className="ui-grid">
                  <div className="ui-stat"><small>Теплопотери</small><b>14.2 кВт</b></div>
                  <div className="ui-stat"><small>Потребление</small><b>620 кВт·ч</b></div>
                  <div className="ui-stat"><small>Пик нагрузки</small><b>−22 °C</b></div>
                </div>
                <div className="ui-bars">
                  {bars.map((h, i) => <i key={i} className={i === 10 ? 'hl' : undefined} style={{ height: `${h}%` }} />)}
                </div>
              </div>
            </div>

            <div className="feature rev reveal">
              <div className="feature-text">
                <span className="feature-num">02</span>
                <h3>Согласуем решение</h3>
                <p>Техническая схема, комплектация, состав работ, стоимость и сроки. Подбираем оборудование под бюджет, площадь и особенности эксплуатации.</p>
                <Link className="btn btn-ghost-dark btn-sm" href="/solutions/">Смотреть решения <Arrow /></Link>
              </div>
              <div className="ui">
                <div className="ui-greet">
                  <h4>Добрый день! Чем поможем объекту?</h4>
                  <div className="ui-input">Нужна солнечная станция для школы, 30 кВт…<b /></div>
                  <div className="ui-chips"><span>Тепловой насос</span><span>Солнечная станция</span><span>Вентиляция</span><span>Очистные</span></div>
                </div>
                <div style={{ marginTop: 16 }}>
                  <div className="ui-row"><span className="k"><span className="ui-dot" />Панели LONGi · 56 шт.</span><em className="mono">согласовано</em></div>
                  <div className="ui-row"><span className="k"><span className="ui-dot" />Гибридный инвертор</span><em className="mono">согласовано</em></div>
                  <div className="ui-row"><span className="k"><span className="ui-dot wait" />Крепления и автоматика</span><em className="mono">в работе</em></div>
                </div>
              </div>
            </div>

            <div className="feature reveal">
              <div className="feature-text">
                <span className="feature-num">03</span>
                <h3>Монтаж, запуск и сервис</h3>
                <p>Устанавливаем, проводим пусконаладку и проверяем систему вместе с вами. Передаём инструкции и остаёмся на сервисном сопровождении круглый год.</p>
                <Link className="btn btn-ghost-dark btn-sm" href="/projects/">Наши работы <Arrow /></Link>
              </div>
              <div className="ui">
                <div className="ui-bar"><i /><i /><i /><span>Объекты · фото с монтажа</span></div>
                <div className="ui-photos">
                  <img src="/assets/projects/38.webp" alt="Монтаж солнечной станции" />
                  <img src="/assets/projects/43.webp" alt="Токмокская школа-интернат" />
                  <img src="/assets/projects/45.webp" alt="Станция в Келсуу" />
                </div>
                <div style={{ marginTop: 10 }}>
                  <div className="ui-row"><span className="k"><span className="ui-dot" />Пусконаладка завершена</span><em className="mono">40 кВт</em></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionTitle soft="а не под склад">Подбираем под объект,</SectionTitle>
          <p className="section-lead reveal">Каждое решение начинается с исходных данных — вот что мы проверяем до покупки оборудования.</p>
          <SolutionTabs />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionTitle soft="для инженерии">Плюс всё</SectionTitle>
          <p className="section-lead reveal">Оборудование и комплектующие в наличии и под заказ. Подберём совместимую комплектацию.</p>
          <div className="kit">
            {kit.map((k) => (
              <Link className="kit-card reveal" href="/catalog/" key={k.title}>
                <div className="kit-head"><span className="kit-ico">{k.icon}</span><h4>{k.title}</h4></div>
                <p>{k.text}</p>
                <div className="kit-list">
                  {k.rows.map((r) => (
                    <div className="kit-row" key={r.label}><img src={r.img} alt="" />{r.label}<span className="mono">{r.status}</span></div>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionTitle soft="Масштаб — под объект.">Простой старт.</SectionTitle>
          <p className="section-lead reveal">Выберите формат работы. Стоимость рассчитывается индивидуально и фиксируется в предложении и договоре.</p>
          <div className="plans">
            {plans.map((p) => (
              <div className={`plan reveal${p.highlight ? ' hl' : ''}`} key={p.name}>
                <span className="plan-name">{p.name}</span>
                <div className="plan-price">{p.price} <small>{p.unit}</small></div>
                <span className="plan-desc">{p.desc}</span>
                <Link className="btn btn-dark" href={leadHref(p.name)}>{p.button}</Link>
                <ul>{p.items.map((it) => <li key={it}>{it}</li>)}</ul>
              </div>
            ))}
          </div>
          <p className="mono center" style={{ marginTop: 26 }}>Индивидуальный расчёт · условия фиксируются в договоре</p>
        </div>
      </section>

      <Cta
        title="Начнём с"
        accent="вашего объекта."
        text="Расскажите о задаче — отопление, вентиляция, солнечная станция или очистка стоков. Пришлите план и фото, а мы предложим решение."
        button="Обсудить проект"
        href={leadHref()}
      />
    </>
  );
}
