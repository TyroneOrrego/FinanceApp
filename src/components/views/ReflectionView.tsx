import React from 'react'
import { CheckCircle2, Flower2, Sparkles } from 'lucide-react'
import { CurrencyCode, Language, MonthPlan } from '../../types'
import { formatMoney } from '../../lib/kakeibo'
import { TRANSLATIONS } from '../../lib/i18n'

interface ReflectionViewProps {
  plan: MonthPlan
  spent: number
  savedActual: number
  currency: CurrencyCode
  lang: Language
  privacyMode: boolean
  onUpdatePlan: (patch: Partial<MonthPlan>) => void
  onCelebrate: () => void
}

export function ReflectionView({
  plan,
  spent,
  savedActual,
  currency,
  lang,
  privacyMode,
  onUpdatePlan,
  onCelebrate,
}: ReflectionViewProps) {
  const t = TRANSLATIONS[lang]
  const tr = t.reflect

  const hasMetGoal = savedActual >= plan.savingsGoal && plan.savingsGoal > 0
  const isReflected = Boolean(
    plan.reflection.wentWell?.trim() ||
    plan.reflection.overspent?.trim() ||
    plan.reflection.nextGoal?.trim()
  )

  return (
    <div className="ledger-screen">
      <div className="screen-heading">
        <span className="eyebrow">
          <span className="eyebrow-line" />
          {tr.eyebrow}
        </span>
        <h2>{tr.title}</h2>
        <p>{tr.subtitle}</p>
      </div>

      {/* Savings Goal Achievement Banner */}
      <section className={`savings-achievement-card ${hasMetGoal ? 'achieved' : ''}`}>
        <div className="achievement-icon">
          {hasMetGoal ? <Sparkles size={24} /> : <Flower2 size={24} />}
        </div>
        <div className="achievement-body">
          <h3>{hasMetGoal ? tr.achievedTitle : tr.reviewTitle}</h3>
          <p>
            {tr.summaryBanner(
              plan.expenses.length,
              formatMoney(spent, currency, false, lang),
              formatMoney(savedActual, currency, false, lang),
              formatMoney(plan.savingsGoal, currency, false, lang)
            )}
          </p>
        </div>
        <button
          type="button"
          className="celebrate-btn"
          onClick={onCelebrate}
          title="Celebrate your mindful practice"
        >
          {tr.celebrateBtn}
        </button>
      </section>

      {/* Savings comparison cards */}
      <section className="panel savings-panel">
        <div>
          <span>{tr.plannedSavings}</span>
          <strong className={privacyMode ? 'privacy-blur' : ''}>
            {formatMoney(plan.savingsGoal, currency, false, lang)}
          </strong>
        </div>
        <div>
          <span>{tr.actualSaved}</span>
          <strong
            className={`${savedActual < 0 ? 'text-destructive' : 'text-forest'} ${privacyMode ? 'privacy-blur' : ''}`}
          >
            {formatMoney(savedActual, currency, false, lang)}
          </strong>
        </div>
      </section>

      {/* Blossom Mindfulness Rating Scale */}
      <section className="panel blossom-rating-card">
        <div className="blossom-header">
          <div>
            <h3>{tr.blossomScaleTitle}</h3>
            <p>{tr.blossomScaleSub}</p>
          </div>
          <span className="blossom-current-score">
            {plan.reflection.mindfulnessScore
              ? `${plan.reflection.mindfulnessScore} / 5 🌸`
              : lang === 'es' ? 'Sin calificar' : 'Unrated'}
          </span>
        </div>
        <div className="blossom-row">
          {[1, 2, 3, 4, 5].map((score) => {
            const isSelected = (plan.reflection.mindfulnessScore ?? 0) >= score
            return (
              <button
                key={score}
                type="button"
                className={`blossom-btn ${isSelected ? 'active' : ''}`}
                onClick={() =>
                  onUpdatePlan({
                    reflection: {
                      ...plan.reflection,
                      mindfulnessScore: plan.reflection.mindfulnessScore === score ? 0 : score,
                    },
                  })
                }
                title={`${score} / 5`}
                aria-label={`Calificar serenidad ${score} de 5`}
              >
                <span className="blossom-emoji">🌸</span>
                <span className="blossom-num">{score}</span>
              </button>
            )
          })}
        </div>
      </section>

      {/* The 3 Core Kakeibo Questions */}
      <section className="panel reflect-panel">
        <div className="panel-heading">
          <div>
            <h2>{tr.questionsTitle}</h2>
            <p>{tr.questionsSubtitle}</p>
          </div>
        </div>

        <div className="reflection-prompts">
          <label>
            <span>{tr.q1Title}</span>
            <small>{tr.q1Sub}</small>
            <textarea
              value={plan.reflection.wentWell}
              onChange={(e) =>
                onUpdatePlan({
                  reflection: { ...plan.reflection, wentWell: e.target.value },
                })
              }
              placeholder={tr.q1Placeholder}
              rows={3}
            />
          </label>

          <label>
            <span>{tr.q2Title}</span>
            <small>{tr.q2Sub}</small>
            <textarea
              value={plan.reflection.overspent}
              onChange={(e) =>
                onUpdatePlan({
                  reflection: { ...plan.reflection, overspent: e.target.value },
                })
              }
              placeholder={tr.q2Placeholder}
              rows={3}
            />
          </label>

          <label>
            <span>{tr.q3Title}</span>
            <small>{tr.q3Sub}</small>
            <textarea
              value={plan.reflection.nextGoal}
              onChange={(e) =>
                onUpdatePlan({
                  reflection: { ...plan.reflection, nextGoal: e.target.value },
                })
              }
              placeholder={tr.q3Placeholder}
              rows={3}
            />
          </label>
        </div>

        {/* Traditional Japanese Hanko Seal (判子) */}
        {(isReflected || (plan.reflection.mindfulnessScore ?? 0) > 0) && (
          <div className="hanko-seal-container">
            <div className="hanko-seal" title={tr.hankoSealCompleted}>
              <div className="hanko-seal-inner">
                <span className="hanko-kanji">済</span>
                <span className="hanko-sub">{lang === 'es' ? 'KAKEIBO' : 'KAKEIBO'}</span>
              </div>
            </div>
            <div className="hanko-copy">
              <strong>{tr.hankoSealCompleted}</strong>
              <p>{tr.hankoSealSub}</p>
            </div>
          </div>
        )}

        <div className="reflection-footer">
          <span>{tr.footerWisdom}</span>
          <button type="button" className="btn-finish-reflection" onClick={onCelebrate}>
            <CheckCircle2 size={15} /> {tr.btnFinish}
          </button>
        </div>
      </section>
    </div>
  )
}
