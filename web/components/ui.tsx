import Link from 'next/link';
import type { ReactNode } from 'react';

export const Arrow = () => <span className="arrow">↗</span>;

export function PageHero({ crumb, title, soft, children }: { crumb: string; title: ReactNode; soft?: ReactNode; children?: ReactNode }) {
  return (
    <section className="page-hero">
      <div className="wrap">
        <span className="mono crumbs"><Link href="/">Главная</Link> / {crumb}</span>
        <h1 className="reveal">{title}{soft && <> <span className="soft-l">{soft}</span></>}</h1>
        {children}
      </div>
    </section>
  );
}

export function SectionTitle({ children, soft, className = 'section-title' }: { children: ReactNode; soft?: ReactNode; className?: string }) {
  return (
    <h2 className={`${className} reveal`}>
      {children}{soft && <> <span className="soft">{soft}</span></>}
    </h2>
  );
}

export function Cta({ title, accent, text, button, href }: { title: string; accent: string; text: string; button: string; href: string }) {
  return (
    <section className="section-sm" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="cta reveal">
          <h2>{title} <em>{accent}</em></h2>
          <p>{text}</p>
          <Link className="btn btn-light" href={href}>{button} <Arrow /></Link>
        </div>
      </div>
    </section>
  );
}
