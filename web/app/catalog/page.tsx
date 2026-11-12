import type { Metadata } from 'next';
import Link from 'next/link';
import { Arrow, PageHero } from '@/components/ui';
import { leadHref, products, waLink } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Каталог оборудования',
  description: 'Котлы, насосы, тепловые насосы, солнечные электростанции, баки и бойлеры, вентиляция, очистные сооружения и комплектующие в Бишкеке.',
};

const perks = [
  { tag: 'Гарантия', title: 'Официальная гарантия', text: 'Гарантия производителя на всё оборудование и сервисное сопровождение.' },
  { tag: 'Доставка', title: 'По всему Кыргызстану', text: 'Бишкек, Чуйская область и регионы через надёжные транспортные компании.' },
  { tag: 'Монтаж', title: 'Установка специалистами', text: 'Профессиональный монтаж оборудования у вас дома, в офисе или на производстве.' },
];

type SpecRow = { label: string; qty?: string; status: string; dot: '' | 'wait' | 'off' };
const spec: SpecRow[] = [
  { label: 'Отопительный котёл', qty: '× 1', status: 'в наличии', dot: '' },
  { label: 'Бойлер косвенного нагрева', qty: '× 1', status: 'в наличии', dot: '' },
  { label: 'Циркуляционный насос', qty: '× 2', status: 'уточняем', dot: 'wait' },
  { label: 'Монтаж и пусконаладка', status: 'по договору', dot: 'off' },
];

export default function CatalogPage() {
  return (
    <>
      <PageHero crumb="Каталог" title="Каталог" soft="оборудования">
        <p className="reveal">Официальная гарантия производителя, доставка по Бишкеку, Чуйской области и регионам. Цену и наличие менеджер уточнит под ваш объект.</p>
      </PageHero>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="prod-grid" style={{ marginTop: 0 }}>
            {products.map((p) => (
              <Link className="prod reveal" href={p.href} key={p.title}>
                <div className="prod-img">
                  <img
                    src={p.img}
                    alt=""
                    style={p.photo ? { width: '100%', height: '100%', objectFit: 'cover', mixBlendMode: 'normal' } : undefined}
                  />
                </div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
                <div className="prod-foot"><span className="mono">{p.tag}</span><Arrow /></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="dark section" id="sale">
        <div className="wrap split">
          <div>
            <span className="mono">Акции и спецпредложения</span>
            <h2 style={{ marginTop: 14 }}>Индивидуальная цена <span className="soft-d">для каждого объекта</span></h2>
            <p className="lead" style={{ color: 'var(--dark-muted)' }}>
              Напишите, какое оборудование и в каком количестве требуется. Менеджер сообщит актуальную цену, наличие и условия заказа.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 28 }}>
              <Link className="btn btn-light" href={leadHref('Хочу узнать актуальные акции')}>Уточнить предложение <Arrow /></Link>
              <a className="btn btn-ghost-dark" href={waLink()} target="_blank" rel="noopener">WhatsApp</a>
            </div>
          </div>
          <div className="ui">
            <div className="ui-bar"><i /><i /><i /><span>Запрос цены · спецификация</span></div>
            {spec.map((r) => (
              <div className="ui-row" key={r.label}>
                <span className="k"><span className={`ui-dot ${r.dot}`} />{r.label}{r.qty && <em>{r.qty}</em>}</span>
                <em className="mono">{r.status}</em>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, padding: 14, background: 'var(--bg-soft)', borderRadius: 12 }}>
              <b style={{ letterSpacing: '-.02em' }}>Индивидуальная скидка</b>
              <Link className="btn btn-dark btn-sm" href={leadHref('Запрос индивидуальной скидки')}>Запросить</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-sm">
        <div className="wrap">
          <div className="grid-3">
            {perks.map((p) => (
              <div className="card reveal" key={p.tag}><span className="num">{p.tag}</span><h3>{p.title}</h3><p>{p.text}</p></div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
