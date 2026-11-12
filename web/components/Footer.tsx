import Link from 'next/link';
import { contacts, leadHref, waLink } from '@/lib/data';

type FooterLink = { href: string; label: string; external?: boolean };

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Решения',
    links: [
      { href: '/solutions/#solar', label: 'Солнечные станции' },
      { href: '/solutions/#heatpump', label: 'Тепловые насосы' },
      { href: '/solutions/#ventilation', label: 'Вентиляция' },
      { href: '/solutions/#wastewater', label: 'Очистные сооружения' },
    ],
  },
  {
    title: 'Компания',
    links: [
      { href: '/about/', label: 'О компании' },
      { href: '/projects/', label: 'Наши работы' },
      { href: '/about/#certs', label: 'Сертификаты' },
      { href: '/catalog/', label: 'Каталог' },
    ],
  },
  {
    title: 'Клиентам',
    links: [
      { href: '/services/', label: 'Услуги' },
      { href: '/contacts/#delivery', label: 'Доставка и оплата' },
      { href: '/catalog/#sale', label: 'Акции' },
      { href: leadHref(), label: 'Заявка' },
    ],
  },
  {
    title: 'Связь',
    links: [
      { href: contacts.phoneHref, label: contacts.phone, external: true },
      { href: `mailto:${contacts.email}`, label: contacts.email, external: true },
      { href: waLink(), label: 'WhatsApp ↗', external: true },
    ],
  },
];

export default function Footer() {
  return (
    <>
      <div className="wrap" aria-hidden="true">
        <div className="wordmark">termoclimat<span>.</span></div>
      </div>
      <footer className="footer">
        <div className="wrap">
          <div className="foot-grid">
            <div className="foot-brand">
              <img src="/assets/img/logo.png" alt="TermoClimat" width={128} height={28} />
              <p>Инженерные системы для дома и бизнеса в Кыргызстане. Проектирование, поставка, монтаж и сервис.</p>
            </div>
            {columns.map((col) => (
              <div key={col.title}>
                <h5>{col.title}</h5>
                <ul>
                  {col.links.map((l) => (
                    <li key={l.href}>
                      {l.external ? (
                        <a href={l.href} {...(l.href.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {})}>{l.label}</a>
                      ) : (
                        <Link href={l.href}>{l.label}</Link>
                      )}
                    </li>
                  ))}
                  {col.title === 'Связь' && <li>{contacts.address}</li>}
                </ul>
              </div>
            ))}
          </div>
          <div className="foot-bottom">
            <span>© {new Date().getFullYear()} TermoClimat · {contacts.hours}</span>
            <a href="https://termoclimat.kg/privacy/">Политика конфиденциальности</a>
          </div>
        </div>
      </footer>
    </>
  );
}
