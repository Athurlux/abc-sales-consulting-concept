import { Link, useParams } from 'react-router'
import { ARTICLES, findArticle } from '../data/insights'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import { EDITORIAL_NOTE } from './Insights'

export default function Article() {
  const { slug } = useParams()
  const article = findArticle(slug)
  useDocumentTitle(article ? article.title : 'Article not found')

  if (!article) {
    return (
      <section className="container not-found">
        <h1>We couldn’t find that article.</h1>
        <div className="button-row"><Link to="/insights" className="button button--primary">See all insights</Link></div>
      </section>
    )
  }

  const index = ARTICLES.indexOf(article)
  const related = [ARTICLES[(index + 1) % ARTICLES.length], ARTICLES[(index + 2) % ARTICLES.length]]

  return (
    <article className="container article">
      <header className="article__head">
        <p className="kicker"><Link to="/insights">Insights</Link> <span aria-hidden="true">/</span> {article.stage}</p>
        <h1>{article.title}</h1>
        <p className="lede">{article.dek}</p>
        <p className="source-note">{EDITORIAL_NOTE} {article.minutes} minute read.</p>
      </header>
      <div className="article__body">
        {article.body.map((block, blockIndex) => (
          <section key={blockIndex}>
            {block.heading && <h2>{block.heading}</h2>}
            {block.paragraphs.map(paragraph => <p key={paragraph.slice(0, 32)}>{paragraph}</p>)}
            {block.list && <ul>{block.list.map(item => <li key={item}>{item}</li>)}</ul>}
          </section>
        ))}
      </div>
      <aside className="article__next" aria-labelledby="next-reads">
        <h2 id="next-reads" className="section-title">Keep reading</h2>
        <ul className="related">
          {related.map(item => <li key={item.slug}><Link to={`/insights/${item.slug}`}>{item.title}</Link><span>{item.stage}</span></li>)}
        </ul>
        <p>Want to practise this properly? <Link to="/programmes">Explore the programmes</Link>.</p>
      </aside>
    </article>
  )
}
