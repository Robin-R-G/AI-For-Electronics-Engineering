'use client';
import { useState, useEffect, type ReactNode } from 'react';
import type { LabProject } from '@/lib/labService';
import styles from './LabDetailPanel.module.css';

interface LabDetailPanelProps {
  project: LabProject;
  allProjects: LabProject[];
  onSelectProject: (id: string) => void;
  onBack: () => void;
}

type Tab = 'planning' | 'circuit' | 'code' | 'debug' | 'career';

const TABS: { id: Tab; label: string }[] = [
  { id: 'planning', label: 'Setup & Planning' },
  { id: 'circuit', label: 'Wiring & Design' },
  { id: 'code', label: 'Code & Firmware' },
  { id: 'debug', label: 'Troubleshooting' },
  { id: 'career', label: 'Career & AI Pack' },
];

export const LabDetailPanel = ({ project, allProjects, onSelectProject, onBack }: LabDetailPanelProps) => {
  const [activeTab, setActiveTab] = useState<Tab>('planning');
  const [copiedRole, setCopiedRole] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [downloadingName, setDownloadingName] = useState<string | null>(null);

  useEffect(() => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setActiveTab('planning');
  }, [project.id]);

  const handleCopyPrompt = (role: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedRole(role);
    setTimeout(() => setCopiedRole(null), 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(project.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleDownload = (name: string) => {
    setDownloadingName(name);
    setTimeout(() => setDownloadingName(null), 1500);
  };

  const p = project;

  return (
    <div className={styles.panel}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <button className={styles.backBtn} onClick={onBack} aria-label="Back to Projects">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Projects
          </button>
          <span className={`${styles.diff} ${styles[p.difficulty.toLowerCase()]}`}>{p.difficulty}</span>
        </div>
        <div>
          <span className={styles.category}>{p.category}</span>
          <h2 className={styles.title}>{p.title}</h2>
        </div>
      </header>

      <nav className={styles.tabs}>
        {TABS.map(t => (
          <button
            key={t.id}
            className={`${styles.tab} ${activeTab === t.id ? styles.activeTab : ''}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </button>
        ))}
        <span className={styles.indicator} style={{
          left: `${TABS.findIndex(t => t.id === activeTab) * (100 / TABS.length)}%`,
          width: `${100 / TABS.length}%`,
        }} />
      </nav>

      <div className={styles.content}>
        {activeTab === 'planning' && (
          <Section>
            <SubSection title="Overview"><p>{p.overview}</p></SubSection>
            <div className={styles.metaGrid}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Estimated Time</span>
                <span className={styles.metaValue}>{p.estimatedTime}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Industry Relevance</span>
                <span className={styles.metaValue}>{p.industryRelevance}</span>
              </div>
            </div>
            <SubSection title="Problem Statement"><p>{p.problemStatement}</p></SubSection>
            <SubSection title="Learning Objectives">
              <ul>{p.learningObjectives.map((o, i) => <li key={i}>{o}</li>)}</ul>
            </SubSection>
            <SubSection title="Required Skills">
              <div className={styles.skills}>{p.requiredSkills.map(s => <span key={s} className={styles.skill}>{s}</span>)}</div>
            </SubSection>
            <SubSection title="Components">
              <div className={styles.compGrid}>
                {p.components.map(c => (
                  <div key={c.name} className={styles.compItem}>
                    <span className={styles.compName}>{c.name}</span>
                    <span className={styles.compQty}>Qty: {c.quantity}</span>
                  </div>
                ))}
              </div>
            </SubSection>
          </Section>
        )}

        {activeTab === 'circuit' && (
          <Section>
            <SubSection title="Working Principle"><p>{p.workingPrinciple}</p></SubSection>
            <SubSection title="Schematic">
              <div className={styles.diagram} dangerouslySetInnerHTML={{ __html: p.circuitDiagramUrl }} />
            </SubSection>
            <SubSection title="Block Diagram">
              <div className={styles.diagram} dangerouslySetInnerHTML={{ __html: p.architectureDiagramUrl }} />
            </SubSection>
            <SubSection title="Pin Connections">
              {p.pinConnections.map((conn, i) => (
                <div key={i} className={styles.pinRow}><code>{conn}</code></div>
              ))}
            </SubSection>
            <SubSection title="Hardware Design"><p>{p.hardwareExplanation}</p></SubSection>
          </Section>
        )}

        {activeTab === 'code' && (
          <Section>
            <SubSection title="Procedure">
              <ol>{p.procedure.map((s, i) => <li key={i}>{s}</li>)}</ol>
            </SubSection>
            <SubSection title="Code" className={styles.codeSection}>
              <button className={styles.copyBtn} onClick={handleCopyCode}>
                {copiedCode ? 'Copied' : 'Copy Code'}
              </button>
              <pre className={styles.codeBlock}>{p.code}</pre>
            </SubSection>
            <SubSection title="Logic Flow">
              <ul>{p.codeExplanation.map((l, i) => <li key={i}>{l}</li>)}</ul>
              <p>{p.softwareExplanation}</p>
            </SubSection>
          </Section>
        )}

        {activeTab === 'debug' && (
          <Section>
            <SubSection title="Common Mistakes">
              <ul>{p.commonErrors.map((e, i) => <li key={i} className={styles.error}>{e}</li>)}</ul>
            </SubSection>
            <SubSection title="Troubleshooting Guide">
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead><tr><th>Symptom</th><th>Cause</th><th>Fix</th></tr></thead>
                  <tbody>
                    {p.debuggingGuide.map((g, i) => (
                      <tr key={i}><td className={styles.symptom}>{g.symptom}</td><td>{g.cause}</td><td className={styles.fix}>{g.fix}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </SubSection>
            <SubSection title="Testing"><ul>{p.testingProcedure.map((t, i) => <li key={i}>{t}</li>)}</ul></SubSection>
            <SubSection title="Safety"><ul>{p.safetyPrecautions.map((s, i) => <li key={i}>{s}</li>)}</ul></SubSection>
          </Section>
        )}

        {activeTab === 'career' && (
          <Section>
            <SubSection title="Downloads" className={styles.downloadsSection}>
              <div className={styles.downloads}>
                {p.downloads.map(dl => (
                  <button key={dl.name} className={styles.dlBtn} onClick={() => handleDownload(dl.name)} disabled={downloadingName === dl.name}>
                    {downloadingName === dl.name ? 'Preparing...' : dl.name}
                  </button>
                ))}
              </div>
            </SubSection>

            <SubSection title="AI Prompt Pack">
              {p.aiPrompts.map(entry => (
                <div key={entry.role} className={styles.promptCard}>
                  <div className={styles.promptHeader}>
                    <strong>{entry.role}</strong>
                    <button className={styles.copyPromptBtn} onClick={() => handleCopyPrompt(entry.role, entry.prompt)}>
                      {copiedRole === entry.role ? 'Copied' : 'Copy Prompt'}
                    </button>
                  </div>
                  <div className={styles.promptBody}>{entry.prompt}</div>
                </div>
              ))}
            </SubSection>

            <SubSection title="Knowledge Check">
              {p.quiz.map((q, i) => (
                <div key={i} className={styles.quizItem}>
                  <p className={styles.quizQ}>{i + 1}. {q.question}</p>
                  <div className={styles.quizOpts}>
                    {q.options.map(opt => {
                      const sel = quizAnswers[i] === opt;
                      let cls = styles.quizOpt;
                      if (sel) cls += ` ${styles.quizOptSel}`;
                      if (quizSubmitted && opt === q.answer) cls += ` ${styles.quizOptCorrect}`;
                      if (quizSubmitted && sel && opt !== q.answer) cls += ` ${styles.quizOptWrong}`;
                      return (
                        <button key={opt} className={cls} disabled={quizSubmitted} onClick={() => setQuizAnswers(p => ({ ...p, [i]: opt }))}>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {quizSubmitted && (
                    <div className={`${styles.quizResult} ${quizAnswers[i] === q.answer ? styles.correct : styles.incorrect}`}>
                      <strong>{quizAnswers[i] === q.answer ? 'Correct! ' : 'Incorrect. '}</strong>
                      {q.explanation}
                    </div>
                  )}
                </div>
              ))}
              {!quizSubmitted ? (
                <button className={styles.submitQuiz} disabled={Object.keys(quizAnswers).length < p.quiz.length} onClick={() => setQuizSubmitted(true)}>
                  Submit Answers
                </button>
              ) : (
                <button className={styles.retryQuiz} onClick={() => { setQuizAnswers({}); setQuizSubmitted(false); }}>
                  Retry Quiz
                </button>
              )}
            </SubSection>

            <SubSection title="Engineering Challenge">
              <div className={styles.challenge}>{p.engineeringChallenge}</div>
            </SubSection>

            <div className={styles.grid2}>
              <SubSection title="Improvements"><ul>{p.improvements.map((i, idx) => <li key={idx}>{i}</li>)}</ul></SubSection>
              <SubSection title="Future Scope"><ul>{p.futureScope.map((s, idx) => <li key={idx}>{s}</li>)}</ul></SubSection>
            </div>

            <SubSection title="Next Projects">
              <div className={styles.nextGrid}>
                {p.suggestedNextProjects.map(id => {
                  const np = allProjects.find(ap => ap.id === id);
                  if (!np) return null;
                  return (
                    <button key={id} className={styles.nextCard} onClick={() => onSelectProject(id)}>
                      <div className={styles.nextTitle}>{np.title}</div>
                      <span className={styles.nextMeta}>{np.category} &middot; {np.difficulty}</span>
                    </button>
                  );
                })}
              </div>
            </SubSection>

            <div className={styles.grid2}>
              <div>
                <span className={styles.metaLabel}>Career Roles</span>
                <div className={styles.skills}>{p.careerRoles.map(r => <span key={r} className={styles.roleChip}>{r}</span>)}</div>
              </div>
              <div>
                <span className={styles.metaLabel}>References</span>
                <ul className={styles.refList}>{p.references.map((r, i) => <li key={i}>{r}</li>)}</ul>
              </div>
            </div>
          </Section>
        )}
      </div>
    </div>
  );
};

const Section = ({ children }: { children: ReactNode }) => <div className={styles.section}>{children}</div>;

const SubSection = ({ title, children, className }: { title: string; children: ReactNode; className?: string }) => (
  <div className={`${styles.subsection} ${className ?? ''}`}>
    <h4 className={styles.subTitle}>{title}</h4>
    {children}
  </div>
);

export default LabDetailPanel;
