import { SALES_PROCESS } from '../data/site'

/**
 * The seven published stages as live HTML blocks rising like a staircase, standing
 * on the "sales mindset" foundation. Text is real content, never part of an image.
 */
export function SalesSteps({ detailed = false }: { detailed?: boolean }) {
  return (
    <div className={`stair ${detailed ? 'stair--detailed' : ''}`} data-anim="stair">
      <ol className="stair__steps">
        {SALES_PROCESS.map((stage, index) => (
          <li key={stage.id} className="stair__step" style={{ '--i': index } as React.CSSProperties} data-anim="step">
            <span className="stair__num" aria-hidden="true">{index + 1}</span>
            <span className="stair__title">{stage.title}</span>
            {detailed && <span className="stair__line">{stage.line}</span>}
          </li>
        ))}
      </ol>
      <p className="stair__base" data-anim="step">Sales mindset <span>underpins every stage</span></p>
    </div>
  )
}
