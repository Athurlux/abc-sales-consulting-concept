import { Link } from 'react-router'
import { PageIntro } from '../components/PageIntro'
import { ARTICLES } from '../data/insights'
import { useDocumentTitle } from '../lib/useDocumentTitle'

export const EDITORIAL_NOTE = 'Concept editorial, written for this website proposal. It is not written or published by ABC Sales Consulting.'

export default function Insights() {
  useDocumentTitle('Insights')
  return (
    <>
      <PageIntro kicker="Insights" title="Practical notes on selling">
        <p>Short articles that follow the stages of the sales process.</p>
        <p className="source-note">{EDITORIAL_NOTE}</p>
      </PageIntro>
      <section className="container section section--tight" aria-label="Articles">
        <ol className="article-list">
          {ARTICLES.map(article => (
            <li key={article.slug} className="article-row">
              <p className="article-row__stage">{article.stage}</p>
              <h2 className="article-row__title"><Link to={`/insights/${article.slug}`}>{article.title}</Link></h2>
              <p>{article.dek}</p>
              <p className="article-row__meta">{article.minutes} minute read</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  )
}
