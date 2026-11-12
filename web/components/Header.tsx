'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { contacts, leadHref, nav } from '@/lib/data';

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
  }, [open]);

  const close = () => setOpen(false);
  const isActive = (href: string) => pathname === href || pathname === href.replace(/\/$/, '');

  return (
    <>
      <header className="header">
        <nav className="nav" aria-label="Основное меню">
          <Link className="nav-logo" href="/" aria-label="TermoClimat — на главную">
            <img src="/assets/img/logo.png" alt="TermoClimat" width={119} height={26} />
          </Link>
          <ul className="nav-links">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={isActive(item.href) ? 'active' : undefined}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="nav-right">
            <a className="nav-phone" href={contacts.phoneHref}>{contacts.phone}</a>
            <Link className="btn btn-dark btn-sm" href={leadHref()}>Обсудить проект</Link>
            <button className="burger" aria-label="Меню" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
              <span />
            </button>
          </div>
        </nav>
      </header>
      <div className="mobile-menu" aria-hidden={!open}>
        <Link href="/" onClick={close}>Главная</Link>
        {nav.map((item) => (
          <Link key={item.href} href={item.href} onClick={close}>{item.label}</Link>
        ))}
        <a className="btn btn-dark" href={contacts.phoneHref} onClick={close}>Позвонить · {contacts.phone}</a>
      </div>
    </>
  );
}
