import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="page-hero">
      <div className="wrap">
        <span className="mono">Ошибка 404</span>
        <h1>Страница <span className="soft-l">не найдена</span></h1>
        <p>Возможно, она переехала. Начните с главной или каталога.</p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 28 }}>
          <Link className="btn btn-dark" href="/">На главную</Link>
          <Link className="btn btn-ghost" href="/catalog/">Каталог</Link>
        </div>
      </div>
    </section>
  );
}
