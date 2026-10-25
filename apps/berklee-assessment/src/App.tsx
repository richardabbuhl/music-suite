import { useEffect, useState } from 'react'
import { getLevel, levels, type SkillArea } from './curriculum'

type Mode = 'practice' | 'test'
type Rating = 'ready' | 'review'
type SavedProgress = Record<string, Rating>

const progressKey = 'berklee-practice-progress'

function loadProgress(): SavedProgress {
  try {
    const saved = localStorage.getItem(progressKey)
    return saved ? (JSON.parse(saved) as SavedProgress) : {}
  } catch (error) {
    console.error('Could not load saved practice progress.', error)
    return {}
  }
}

function App() {
  const [levelNumber, setLevelNumber] = useState(1)
  const [mode, setMode] = useState<Mode>('practice')
  const [activeSkill, setActiveSkill] = useState<SkillArea | null>(null)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [ratings, setRatings] = useState<SavedProgress>(loadProgress)
  const [testRatings, setTestRatings] = useState<Record<number, Rating>>({})
  const [testStarted, setTestStarted] = useState(false)

  const level = getLevel(levelNumber)
  const currentSkill = activeSkill ?? level.skills[0]
  const completedSkills = level.skills.filter((skill) => ratings[`${levelNumber}:${skill.name}`] === 'ready').length
  const testScore = Object.values(testRatings).filter((rating) => rating === 'ready').length

  useEffect(() => {
    try {
      localStorage.setItem(progressKey, JSON.stringify(ratings))
    } catch (error) {
      console.error('Could not save practice progress.', error)
    }
  }, [ratings])

  const testSkills = level.skills

  function chooseLevel(number: number) {
    setLevelNumber(number)
    setActiveSkill(null)
    setQuestionIndex(0)
    setTestRatings({})
    setTestStarted(false)
  }

  function chooseMode(nextMode: Mode) {
    setMode(nextMode)
    setActiveSkill(null)
    setQuestionIndex(0)
    setTestRatings({})
    setTestStarted(false)
  }

  function markPractice(rating: Rating) {
    setRatings((current) => ({
      ...current,
      [`${levelNumber}:${currentSkill.name}`]: rating,
    }))
  }

  function changeQuestion(direction: number) {
    setQuestionIndex((current) => (current + direction + 3) % 3)
  }

  function rateTestSkill(index: number, rating: Rating) {
    setTestRatings((current) => ({ ...current, [index]: rating }))
  }

  function startTest() {
    setTestStarted(true)
    setTestRatings({})
  }

  const practicePrompts = [
    `Use the ${currentSkill.summary.toLowerCase()} material for Level ${levelNumber}. Work through the forms in the linked source, then perform them from memory.`,
    `Choose a form from the ${currentSkill.name.toLowerCase()} material. Play it slowly and evenly, then repeat it with a steady pulse.`,
    `Review the ${currentSkill.name.toLowerCase()} forms in the source material. Perform one you know confidently, then revisit one that needs work.`,
  ]

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <button className="brand" onClick={() => chooseMode('practice')} aria-label="Berklee Practice Room home">
          <span className="brand-mark" aria-hidden="true">B</span>
          <span className="brand-name">Practice<br />Room</span>
        </button>
        <div className="sidebar-label">YOUR PRACTICE</div>
        <nav className="main-nav" aria-label="Main navigation">
          <button className={mode === 'practice' ? 'nav-item active' : 'nav-item'} onClick={() => chooseMode('practice')}>
            <span className="nav-icon" aria-hidden="true">◫</span> Study dashboard
          </button>
          <button className={mode === 'test' ? 'nav-item active' : 'nav-item'} onClick={() => chooseMode('test')}>
            <span className="nav-icon" aria-hidden="true">◷</span> Mock test
          </button>
        </nav>
        <div className="level-heading">
          <div className="sidebar-label">PROFICIENCY LEVELS</div>
          <span className="level-count">1–8</span>
        </div>
        <nav className="level-nav" aria-label="Select proficiency level">
          {levels.map((item) => (
            <button
              key={item.number}
              className={levelNumber === item.number ? 'level-link selected' : 'level-link'}
              onClick={() => chooseLevel(item.number)}
              aria-current={levelNumber === item.number ? 'page' : undefined}
            >
              <span className="level-number">{String(item.number).padStart(2, '0')}</span>
              <span>{item.focus.split(' · ')[0]}</span>
              {ratings && item.skills.every((skill) => ratings[`${item.number}:${skill.name}`] === 'ready') && (
                <span className="level-check" aria-label="All areas marked ready">✓</span>
              )}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <span className="status-dot" />
          <span>Small steps, steady progress.</span>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb"><span>Practice</span><span className="crumb-slash">/</span><strong>Level {levelNumber}</strong></div>
          <a className="requirements-link" href="docs/Berklee-Exam-Requirements/levels1-8.pdf" target="_blank" rel="noreferrer">
            Exam requirements <span aria-hidden="true">↗</span>
          </a>
        </header>

        <div className="page-wrap">
          <section className="welcome-row">
            <div>
              <div className="eyebrow">BERKLEE PRIVATE LESSON PROFICIENCY</div>
              <h1>{mode === 'test' ? 'Mock test' : 'Your practice room'}<span className="title-period">.</span></h1>
              <p className="welcome-copy">A focused place to prepare for your next milestone.</p>
            </div>
            <div className="level-stamp"><span>LEVEL</span><strong>{String(levelNumber).padStart(2, '0')}</strong></div>
          </section>

          <section className="level-overview">
            <div className="overview-copy">
              <div className="overview-kicker">CURRENT FOCUS</div>
              <h2>{level.focus}</h2>
              <p>{level.description}</p>
            </div>
            <div className="overview-progress">
              <div className="progress-label"><span>Areas marked ready</span><strong>{completedSkills} <span>/ {level.skills.length}</span></strong></div>
              <div className="progress-track" role="progressbar" aria-label="Practice areas marked ready" aria-valuenow={completedSkills} aria-valuemin={0} aria-valuemax={level.skills.length}>
                <span style={{ width: `${(completedSkills / level.skills.length) * 100}%` }} />
              </div>
              <p>Mark areas as you practice. Your progress stays on this device.</p>
            </div>
          </section>

          {mode === 'practice' ? (
            <div className="content-grid">
              <section className="panel skills-panel">
                <div className="section-heading">
                  <div>
                    <div className="eyebrow">LEVEL {levelNumber} CURRICULUM</div>
                    <h2>Practice areas</h2>
                  </div>
                  <span className="muted-count">{level.skills.length} areas</span>
                </div>
                <div className="skill-list">
                  {level.skills.map((skill, index) => {
                    const rating = ratings[`${levelNumber}:${skill.name}`]
                    return (
                      <button className={currentSkill.name === skill.name ? 'skill-item selected' : 'skill-item'} key={skill.name} onClick={() => { setActiveSkill(skill); setQuestionIndex(0) }}>
                        <span className="skill-index">{String(index + 1).padStart(2, '0')}</span>
                        <span className="skill-info"><strong>{skill.name}</strong><small>{skill.summary}</small></span>
                        <span className={rating === 'ready' ? 'skill-state ready' : rating === 'review' ? 'skill-state review' : 'skill-state'}>
                          {rating === 'ready' ? 'Ready' : rating === 'review' ? 'Review' : 'Start'} <span aria-hidden="true">→</span>
                        </span>
                      </button>
                    )
                  })}
                </div>
              </section>

              <section className="panel drill-panel">
                <div className="drill-topline"><span className="mini-icon" aria-hidden="true">♪</span><span>GUIDED PRACTICE</span><span className="step-count">0{questionIndex + 1} / 03</span></div>
                <h2>{currentSkill.name}</h2>
                <p className="drill-description">{practicePrompts[questionIndex]}</p>
                <a className="source-link" href={currentSkill.resource} target="_blank" rel="noreferrer">
                  <span className="document-icon" aria-hidden="true">↗</span>
                  <span><strong>{currentSkill.resourceLabel ?? 'Open source material'}</strong><small>View supporting PDF</small></span>
                  <span className="source-arrow" aria-hidden="true">↗</span>
                </a>
                <div className="drill-controls">
                  <button className="text-button" onClick={() => changeQuestion(-1)}>← Previous</button>
                  <button className="text-button" onClick={() => changeQuestion(1)}>Next prompt →</button>
                </div>
                <div className="self-check">
                  <span>How did that feel?</span>
                  <div>
                    <button className={ratings[`${levelNumber}:${currentSkill.name}`] === 'review' ? 'rating-button chosen' : 'rating-button'} onClick={() => markPractice('review')}>Needs review</button>
                    <button className={ratings[`${levelNumber}:${currentSkill.name}`] === 'ready' ? 'rating-button chosen positive' : 'rating-button positive'} onClick={() => markPractice('ready')}>I’m ready</button>
                  </div>
                </div>
              </section>

              <section className="resource-note">
                <span className="note-icon" aria-hidden="true">i</span>
                <p>Practice prompts are study suggestions, not official exam questions. Check the complete exam requirements and your instructor’s guidance for exact expectations.</p>
                <a href={`docs/Berklee-Exam-Requirements/${level.sample}`} target="_blank" rel="noreferrer">Level {levelNumber} sample questions ↗</a>
              </section>
            </div>
          ) : (
            <section className="panel test-panel">
              {!testStarted ? (
                <div className="test-intro">
                  <div className="test-symbol" aria-hidden="true">↗</div>
                  <div className="eyebrow">A SELF-GUIDED CHECK-IN</div>
                  <h2>Ready to run through Level {levelNumber}?</h2>
                  <p>Work through each practice area without pausing to look at notes. This mock test is a self-assessment, not an official Berklee exam or an automatically scored test.</p>
                  <div className="test-details">
                    <span><strong>{testSkills.length}</strong> practice areas</span>
                    <span><strong>Self</strong> assessed</span>
                    <span><strong>Anytime</strong> at your pace</span>
                  </div>
                  <button className="primary-button" onClick={startTest}>Begin mock test <span aria-hidden="true">→</span></button>
                  <a className="sample-link" href={`docs/Berklee-Exam-Requirements/${level.sample}`} target="_blank" rel="noreferrer">Open Level {levelNumber} sample questions ↗</a>
                </div>
              ) : Object.keys(testRatings).length < testSkills.length ? (
                <div className="test-session">
                  <div className="test-session-header">
                    <div><div className="eyebrow">MOCK TEST · LEVEL {levelNumber}</div><h2>Area {Object.keys(testRatings).length + 1} of {testSkills.length}</h2></div>
                    <button className="text-button" onClick={() => setTestStarted(false)}>Exit test</button>
                  </div>
                  <div className="test-progress">{testSkills.map((_, index) => <span key={index} className={testRatings[index] ? 'done' : index === Object.keys(testRatings).length ? 'current' : ''} />)}</div>
                  {(() => {
                    const nextIndex = testSkills.findIndex((_, index) => testRatings[index] === undefined)
                    const skill = testSkills[nextIndex]
                    return (
                      <div className="test-question">
                        <div className="test-category">{skill.name}</div>
                        <h3>Perform the Level {levelNumber} material for this area from memory.</h3>
                        <p>Use the linked support material only to confirm the scope before you begin. For an exam-like check, put your notes aside while performing.</p>
                        <a className="source-link" href={skill.resource} target="_blank" rel="noreferrer">
                          <span className="document-icon" aria-hidden="true">↗</span>
                          <span><strong>{skill.resourceLabel ?? 'Open source material'}</strong><small>Supporting PDF</small></span>
                          <span className="source-arrow" aria-hidden="true">↗</span>
                        </a>
                        <div className="test-rating">
                          <span>How did you do?</span>
                          <button className="rating-button" onClick={() => rateTestSkill(nextIndex, 'review')}>Needs more practice</button>
                          <button className="rating-button positive" onClick={() => rateTestSkill(nextIndex, 'ready')}>I’m confident</button>
                        </div>
                      </div>
                    )
                  })()}
                </div>
              ) : (
                <div className="test-result">
                  <div className="result-mark" aria-hidden="true">{testScore === testSkills.length ? '✓' : '↻'}</div>
                  <div className="eyebrow">MOCK TEST COMPLETE</div>
                  <h2>{testScore} of {testSkills.length} areas marked confident</h2>
                  <p>{testScore === testSkills.length ? 'Nice work. Keep reviewing the source materials and check in with your instructor.' : 'Use the areas below as a guide for your next practice session.'}</p>
                  <div className="result-list">
                    {testSkills.map((skill, index) => (
                      <div key={skill.name}><span>{skill.name}</span><strong className={testRatings[index] === 'ready' ? 'result-ready' : 'result-review'}>{testRatings[index] === 'ready' ? 'Confident' : 'Review'}</strong></div>
                    ))}
                  </div>
                  <button className="primary-button" onClick={startTest}>Try again <span aria-hidden="true">→</span></button>
                  <button className="sample-link button-link" onClick={() => chooseMode('practice')}>Back to practice</button>
                </div>
              )}
            </section>
          )}
          <footer className="page-footer">A practice companion for your studies. Use official course materials and your instructor’s guidance as the source of truth.</footer>
        </div>
      </main>
    </div>
  )
}

export default App
