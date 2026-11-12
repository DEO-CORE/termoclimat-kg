'use client';

import { useState } from 'react';
import { solutions, type Solution } from '@/lib/data';

const order: Solution['id'][] = ['heatpump', 'solar', 'ventilation', 'wastewater'];
const items = order
  .map((id) => solutions.find((s) => s.id === id))
  .filter((s): s is Solution => s !== undefined);

export default function SolutionTabs() {
  const [active, setActive] = useState<Solution['id']>(items[0].id);
  const current = items.find((s) => s.id === active) ?? items[0];

  return (
    <>
      <div className="tabs" role="tablist">
        {items.map((s) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={s.id === active}
            className={`tab${s.id === active ? ' on' : ''}`}
            onClick={() => setActive(s.id)}
          >
            {s.tab}
          </button>
        ))}
      </div>
      <div className="tab-panel on" role="tabpanel" key={current.id}>
        <div>
          <h3>{current.tabTitle}</h3>
          <p className="lead">{current.tabLead}</p>
          <ul className="ticks">
            {current.steps.map((st) => (
              <li key={st.title}><span><b>{st.title}:</b> {st.text}</span></li>
            ))}
          </ul>
        </div>
        <div className="shot">
          <div className="shot-head">
            <span className="mono">Решение · {current.tab}</span>
            <span className="shot-pill">{current.pill}</span>
          </div>
          <h4>{current.shotTitle}</h4>
          <p>{current.shotText}</p>
          <img src={current.img} alt={current.name} />
        </div>
      </div>
    </>
  );
}
