import type { Metadata } from 'next';
import Link from 'next/link';
import ProjectGallery from '@/components/ProjectGallery';
import { Arrow, Cta, PageHero, SectionTitle } from '@/components/ui';
import { leadHref, projects, totalKw } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Наши работы',
  description: 'Реализованные солнечные электростанции, тепловые насосы и инженерные системы TermoClimat: 2ГИС, школы Карабулака и Токмока, станции по Кыргызстану.',
};

const stats = [
  { value: '9+', label: 'лет на рынке инженерных систем' },
  { value: String(totalKw), unit: ' кВт', label: 'солнечной генерации на ключевых объектах' },
  { value: String(projects.length + 1), label: 'знаковых объектов в портфолио' },
  { value: '4', label: 'инженерных направления' },
];

export default function ProjectsPage() {
  return (
    <>
      <PageHero crumb="Проекты" title="Объекты," soft="которые работают">
        <p className="reveal">Солнечные электростанции, тепловые насосы и инженерные системы — от офисов в Бишкеке до школ и сёл по всему Кыргызстану.</p>
      </PageHero>

      <section className="dark section" style={{ padding: '70px 0' }}>
        <div className="wrap">
          <div className="stats">
            {stats.map((s) => (
              <div className="stat reveal" key={s.label}>
                <b>{s.value}{s.unit && <small style={{ fontSize: '.4em', color: 'var(--dark-muted)' }}>{s.unit}</small>}</b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionTitle soft="на объектах">Солнечные электростанции</SectionTitle>
          <div className="proj-grid">
            {projects.map((p) => (
              <article className="proj reveal" key={p.title}>
                <div className="proj-img"><img src={p.img} alt={`${p.title} — солнечные панели`} /></div>
                <div className="proj-body">
                  <div><h3>{p.title}</h3><span className="mono">{p.place} · солнечные панели</span></div>
                  <div className="proj-kw">{p.kw}<small> кВт</small></div>
                </div>
              </article>
            ))}
          </div>
          <article className="proj proj-feature reveal">
            <div className="proj-img"><img src="/assets/projects/school-ilim.webp" alt="Школа «Илим»" /></div>
            <div className="proj-body">
              <span className="mono">Образование · солнечные панели</span>
              <h3>Школа «Илим»</h3>
              <p>Подход к знаниям и эффективности развития страны — собственная солнечная генерация для образовательного объекта.</p>
              <Link className="btn btn-dark" style={{ marginTop: 24 }} href={leadHref('Солнечная станция для школы')}>Похожий проект <Arrow /></Link>
            </div>
          </article>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionTitle soft="с объектов">Фотографии</SectionTitle>
          <ProjectGallery />
        </div>
      </section>

      <Cta title="Следующий объект —" accent="ваш." text="Расскажите о задаче, и мы подберём решение по опыту похожих проектов." button="Обсудить проект" href={leadHref()} />
    </>
  );
}
