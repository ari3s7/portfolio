import { copy, type Project } from '@/data'
import { cx } from '@/lib/cx'
import { hasUrl } from '@/lib/hasUrl'

type CaseFileProps = {
  project: Project
  open: boolean
  interactive: boolean
  onToggle: () => void
  onClose: () => void
}

export function CaseFile({
  project,
  open,
  interactive,
  onToggle,
  onClose,
}: CaseFileProps) {
  const github = hasUrl(project.github) ? project.github : null
  const live = hasUrl(project.live) ? project.live : null
  const materials = project.technologies.filter(Boolean)
  const status = project.status.trim()
  const result = project.result.trim()
  const image = project.image?.trim()
  const titleId = `case-title-${project.id}`
  const docketId = `case-docket-${project.id}`

  return (
    <article
      className={cx('case-file', open && 'is-open')}
      data-file={project.id}
      aria-labelledby={titleId}
    >
      {interactive ? (
        <button
          type="button"
          className="case-file-hit"
          aria-expanded={open}
          aria-controls={docketId}
          aria-label={`${open ? copy.projects.close : copy.projects.open}: ${copy.projects.fileLabel} ${project.number}, ${project.title}`}
          onClick={onToggle}
        />
      ) : null}

      <div className="case-file-paper">
        <div className="case-file-fiber" aria-hidden="true" />
        <div className="case-file-halftone" aria-hidden="true" />
        <span className="case-file-pin" aria-hidden="true" />
        <span className="case-file-scribble" aria-hidden="true" />
        <span className="case-file-stain case-file-stain-a" aria-hidden="true" />
        <span className="case-file-stain case-file-stain-b" aria-hidden="true" />
        <span className="case-file-veil" aria-hidden="true" />

        <svg
          className="case-file-ink"
          viewBox="0 0 280 360"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M9 16C16 7 34 8 58 9H222C248 8 271 12 272 38V322C273 346 254 353 226 354H48C18 353 7 342 8 318V42C7 26 5 20 9 16Z"
            fill="none"
            stroke="#0c0b09"
            strokeWidth="2.35"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <path
            d="M22 28H252"
            fill="none"
            stroke="#0c0b09"
            strokeWidth="0.7"
            opacity="0.28"
          />
          <path
            d="M16 48V330"
            fill="none"
            stroke="#0c0b09"
            strokeWidth="0.55"
            opacity="0.2"
          />
        </svg>

        <header className="case-file-head">
          <p className="case-file-kicker">
            {copy.projects.fileLabel} {project.number}
          </p>
          <h3 id={titleId} className="case-file-title letterpress">
            {project.title}
          </h3>
        </header>

        <p className="case-file-body">{project.description}</p>

        {status ? <p className="case-file-stamp">{status}</p> : null}

        <div
          className="case-file-docket"
          id={docketId}
          aria-hidden={!open}
          inert={!open}
        >
          <div className="case-file-docket-inner">
            <p className="case-file-dossier">{copy.projects.dossier}</p>

            {result ? (
              <dl className="case-file-meta">
                <div>
                  <dt>{copy.projects.resultLabel}</dt>
                  <dd>{result}</dd>
                </div>
              </dl>
            ) : null}

            {image ? (
              <img className="case-file-plate" src={image} alt="" />
            ) : null}

            {materials.length > 0 ? (
              <div className="case-file-tech">
                <p className="case-file-tech-label">{copy.projects.techLabel}</p>
                <ul className="case-file-materials">
                  {materials.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {github || live ? (
              <p className="case-file-links">
                {github ? (
                  <a
                    className="case-file-link"
                    tabIndex={open ? 0 : -1}
                    href={github}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {copy.projects.github}
                  </a>
                ) : null}
                {live ? (
                  <a
                    className="case-file-link"
                    tabIndex={open ? 0 : -1}
                    href={live}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {copy.projects.live}
                  </a>
                ) : null}
              </p>
            ) : null}

            <button type="button" className="case-file-close" tabIndex={open ? 0 : -1} onClick={onClose}>
              {copy.projects.close}
            </button>
          </div>
        </div>
      </div>

      <span className="case-file-shadow" aria-hidden="true" />
    </article>
  )
}
