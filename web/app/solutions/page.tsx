import type { Metadata } from 'next';
import Link from 'next/link';
import { Arrow, Cta, PageHero, SectionTitle } from '@/components/ui';
import { faq, leadHref, solutions } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Инженерные решения',
  description: 'Солнечные электростанции, тепловые насосы, вентиляция и очистные сооружения в Бишкеке: подбор под объект, монтаж и сервис.',
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero crumb="Решения" title="Четыре направления." soft="Одна инженерная команда.">
        <p className="reveal">Подбираем систему по исходным данным объекта — теплопотерям, потреблению, планировке и условиям эксплуатации.</p>
      </PageHero>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          {solutions.map((s, i) => (
            <div className={`sol reveal${i % 2 ? ' rev' : ''}`} id={s.id} key={s.id}>
              <div className="sol-img"><img src={s.img} alt={s.name} /></div>
              <div>
                <span className="mono">{String(i + 1).padStart(2, '0')} · {s.name}</span>
                <h2>{s.title}</h2>
                <p className="lead">{s.lead}</p>
                <div className="steps-mini">
                  {s.steps.map((st) => <div key={st.title}><b>{st.title}</b><span>{st.short}</span></div>)}
                </div>
                <div className="chips">{s.chips.map((c) => <span key={c}>{c}</span>)}</div>
                <Link className="btn btn-dark" style={{ marginTop: 28 }} href={leadHref(s.name)}>Обсудить расчёт <Arrow /></Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionTitle>Частые вопросы</SectionTitle>
          <div className="faq reveal">
            {faq.map((f, i) => (
              <details key={f.q} open={i === 0}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Cta title="Не знаете, что выбрать?" accent="Подскажем." text="Опишите объект — инженер предложит одно или комбинацию решений." button="Получить консультацию" href={leadHref()} />
    </>
  );
}
