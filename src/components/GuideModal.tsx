import { BookOpen, CheckCircle2, HeartHandshake, ShieldCheck, Sparkles, X } from 'lucide-react'
import { Language } from '../types'
import { PILLARS } from '../lib/kakeibo'
import { TRANSLATIONS } from '../lib/i18n'

interface GuideModalProps {
  isOpen: boolean
  onClose: () => void
  lang: Language
}

export function GuideModal({ isOpen, onClose, lang }: GuideModalProps) {
  if (!isOpen) return null

  const t = TRANSLATIONS[lang]
  const tg = t.guideModal

  const steps = [
    { num: tg.s1Num, title: tg.s1Title, desc: tg.s1Desc },
    { num: tg.s2Num, title: tg.s2Title, desc: tg.s2Desc },
    { num: tg.s3Num, title: tg.s3Title, desc: tg.s3Desc },
    { num: tg.s4Num, title: tg.s4Title, desc: tg.s4Desc },
  ]

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-sheet guide-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="modal-eyebrow">{tg.eyebrow}</span>
            <h3>{tg.title}</h3>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close guide"
          >
            <X size={18} />
          </button>
        </div>

        <div className="guide-body">
          <div className="guide-intro-banner">
            <Sparkles size={20} className="guide-sparkle" />
            <p>{tg.intro}</p>
          </div>

          <h4 className="guide-section-title">{tg.stepsTitle}</h4>
          <div className="guide-steps-grid">
            {steps.map((st) => (
              <div key={st.num} className="guide-step-card">
                <span className="guide-step-num">{st.num}</span>
                <h5>{st.title}</h5>
                <p>{st.desc}</p>
              </div>
            ))}
          </div>

          <h4 className="guide-section-title">{tg.pillarsTitle}</h4>
          <div className="guide-pillars-grid">
            {PILLARS.map((p) => {
              const pTrans = t.pillars[p.name]
              return (
                <div
                  key={p.name}
                  className="guide-pillar-card"
                  style={{ backgroundColor: p.bgColor, borderColor: p.borderColor }}
                >
                  <div className="guide-pillar-title" style={{ color: p.color }}>
                    <span className="guide-pillar-kanji">{p.kanji}</span>
                    <strong>{pTrans.name}</strong>
                    <small>({p.japanese})</small>
                  </div>
                  <p className="guide-pillar-note">{pTrans.note}</p>
                  <div className="guide-pillar-examples">
                    <span>{lang === 'es' ? 'Ejemplos:' : 'Examples:'}</span> {pTrans.examples}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="guide-tip-card">
            <HeartHandshake size={20} className="guide-tip-icon" />
            <div>
              <strong>{tg.rule24Title}</strong>
              <p>{tg.rule24Desc}</p>
            </div>
          </div>
        </div>

        <div className="modal-actions">
          <button type="button" onClick={onClose} className="modal-primary-btn w-full">
            <CheckCircle2 size={16} /> {tg.understandBtn}
          </button>
        </div>
      </div>
    </div>
  )
}
