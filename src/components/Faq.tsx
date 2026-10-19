export function Faq({ items, title = 'Questions' }: { items: { q: string; a: string }[]; title?: string }) {
  return (
    <section className="faq" aria-labelledby="faq-title">
      <h2 id="faq-title" className="section-title">{title}</h2>
      <div className="faq__list">
        {items.map(item => (
          <details key={item.q} className="faq__item">
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
