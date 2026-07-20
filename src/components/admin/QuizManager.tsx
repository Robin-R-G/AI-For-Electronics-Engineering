'use client';
import React, { useEffect, useState, useMemo } from 'react';
import { quizQuestions } from '@/data/quizQuestions';
import { QuizQuestion, Difficulty, QuestionCategory } from '@/data/quizTypes';
import {
  loadQuestions,
  saveCustomQuestion,
  deleteQuestion,
  getQuestionAnalytics,
  resetQuestions,
} from '@/lib/quizService';
import styles from './AdminStyles.module.css';

export default function QuizManager() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [analytics, setAnalytics] = useState<ReturnType<typeof getQuestionAnalytics>>({
    mostDifficultQuestions: [],
    mostIncorrectTopics: [],
    averageScore: 0,
    categoryPopularity: []
  });

  const [filterTopic, setFilterTopic] = useState<string>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');

  const [editingId, setEditingId] = useState<string | null>(null);
  const [id, setId] = useState('');
  const [question, setQuestion] = useState('');
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [optionC, setOptionC] = useState('');
  const [optionD, setOptionD] = useState('');
  const [correctOption, setCorrectOption] = useState<'A' | 'B' | 'C' | 'D'>('A');
  const [explanation, setExplanation] = useState('');
  const [relatedLesson, setRelatedLesson] = useState('');
  const [tags, setTags] = useState('');
  const [topic, setTopic] = useState('Embedded Systems');
  const [category, setCategory] = useState<QuestionCategory>('concept-understanding');
  const [difficulty, setDifficulty] = useState<Difficulty>('Intermediate');

  const [importJson, setImportJson] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const reload = async () => {
    const list = await loadQuestions(quizQuestions);
    setQuestions(list);
    setAnalytics(getQuestionAnalytics(list));
  };

  useEffect(() => {
    reload();
    const handler = () => reload();
    window.addEventListener('questions-updated', handler);
    return () => window.removeEventListener('questions-updated', handler);
  }, []);

  const handleEdit = (q: QuizQuestion) => {
    setEditingId(q.id);
    setId(q.id);
    setQuestion(q.question);
    setOptionA(q.options[0] || '');
    setOptionB(q.options[1] || '');
    setOptionC(q.options[2] || '');
    setOptionD(q.options[3] || '');

    const correctIdx = q.options.indexOf(q.correctAnswer);
    if (correctIdx === 0) setCorrectOption('A');
    else if (correctIdx === 1) setCorrectOption('B');
    else if (correctIdx === 2) setCorrectOption('C');
    else if (correctIdx === 3) setCorrectOption('D');

    setExplanation(q.explanation);
    setRelatedLesson(q.relatedLesson);
    setTags(q.tags.join(', '));
    setTopic(q.topic || 'Embedded Systems');
    setCategory(q.category);
    setDifficulty(q.difficulty);

    setSuccessMsg('Loaded question ' + q.id + ' for editing.');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (qId: string) => {
    if (confirm('Are you sure you want to delete question ' + qId + '?')) {
      deleteQuestion(qId);
      setSuccessMsg('Question deleted.');
      reload();
    }
  };

  const handleFormReset = () => {
    setEditingId(null);
    setId('');
    setQuestion('');
    setOptionA('');
    setOptionB('');
    setOptionC('');
    setOptionD('');
    setCorrectOption('A');
    setExplanation('');
    setRelatedLesson('');
    setTags('');
    setTopic('Embedded Systems');
    setCategory('concept-understanding');
    setDifficulty('Intermediate');
    setErrorMsg('');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!question.trim() || !optionA.trim() || !optionB.trim()) {
      setErrorMsg('Question text and at least Options A and B are required.');
      return;
    }

    const opts = [
      optionA.trim(),
      optionB.trim(),
      optionC.trim(),
      optionD.trim()
    ].filter(Boolean);

    let correctText = '';
    if (correctOption === 'A') correctText = optionA.trim();
    else if (correctOption === 'B') correctText = optionB.trim();
    else if (correctOption === 'C') correctText = optionC.trim();
    else if (correctOption === 'D') correctText = optionD.trim();

    if (!correctText) {
      setErrorMsg('Correct option must map to a non-empty option field.');
      return;
    }

    const qId = editingId || id.trim() || 'custom-' + Date.now();
    const newQuestion: QuizQuestion = {
      id: qId,
      category,
      difficulty,
      question: question.trim(),
      options: opts,
      correctAnswer: correctText,
      explanation: explanation.trim(),
      relatedLesson: relatedLesson.trim() || 'quiz',
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      topic: topic.trim() || 'Embedded Systems'
    };

    saveCustomQuestion(newQuestion);
    setSuccessMsg(editingId ? 'Question updated successfully!' : 'Question added successfully!');
    handleFormReset();
    reload();
  };

  const handleImport = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const parsed = JSON.parse(importJson);
      const list = Array.isArray(parsed) ? parsed : [parsed];

      list.forEach((q: any) => {
        if (!q.id || !q.question || !q.options || !q.correctAnswer) {
          throw new Error('Invalid question format: missing required fields in ' + JSON.stringify(q));
        }
        saveCustomQuestion({
          id: q.id,
          category: q.category || 'concept-understanding',
          difficulty: q.difficulty || 'Intermediate',
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation || 'No explanation provided.',
          relatedLesson: q.relatedLesson || 'quiz',
          tags: q.tags || [],
          topic: q.topic || 'General'
        });
      });

      setSuccessMsg('Successfully imported ' + list.length + ' questions.');
      setImportJson('');
      reload();
    } catch (err: any) {
      setErrorMsg('Import failed: ' + err.message);
    }
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(questions, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "workshop_quiz_questions_export.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleResetDb = () => {
    if (confirm('Are you sure you want to restore default questions? This will wipe out all custom questions and deletions!')) {
      resetQuestions();
      setSuccessMsg('Database reset to defaults.');
      reload();
    }
  };

  const topicsList = useMemo(() => {
    const list = new Set<string>();
    questions.forEach(q => {
      if (q.topic) list.add(q.topic);
    });
    return Array.from(list);
  }, [questions]);

  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      const matchTopic = filterTopic === 'all' || q.topic === filterTopic;
      const matchDiff = filterDifficulty === 'all' || q.difficulty === filterDifficulty;
      return matchTopic && matchDiff;
    });
  }, [questions, filterTopic, filterDifficulty]);

  return (
    <div className={styles.certGrid}>
      <div className={styles.certLeftCol}>
        <section className={styles.certSection}>
          <h2>{editingId ? 'Edit Question' : 'Add Quiz Question'}</h2>
          {errorMsg && <div className={styles.errorBox}>{errorMsg}</div>}
          {successMsg && <div className={styles.statusMsg}>{successMsg}</div>}

          <form onSubmit={handleFormSubmit} className={styles.formGrid}>
            <label className={styles.field}>
              <span>Question ID (Auto-generated if blank)</span>
              <input value={id} onChange={(e) => setId(e.target.value)} disabled={!!editingId} placeholder="e.g. custom-q1" />
            </label>

            <label className={styles.field}>
              <span>Topic Category</span>
              <input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. Embedded Systems, PCB Design, AI" required />
            </label>

            <label className={styles.field}>
              <span>Difficulty</span>
              <select value={difficulty} onChange={(e) => setDifficulty(e.target.value as Difficulty)}>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </label>

            <label className={styles.field}>
              <span>Evaluation Mode</span>
              <select value={category} onChange={(e) => setCategory(e.target.value as QuestionCategory)}>
                <option value="concept-understanding">Concept Understanding</option>
                <option value="practical-application">Practical Application</option>
                <option value="debugging-scenarios">Debugging Scenarios</option>
                <option value="circuit-reasoning">Circuit Reasoning</option>
                <option value="engineering-decisions">Engineering Decisions</option>
                <option value="real-world-situations">Real-world Situations</option>
                <option value="interview-style">Interview-style</option>
                <option value="industry-oriented">Industry-oriented</option>
              </select>
            </label>

            <label className={styles.field} style={{ gridColumn: '1 / -1' }}>
              <span>Question Text *</span>
              <textarea value={question} onChange={(e) => setQuestion(e.target.value)} rows={3} placeholder="Ask a technical engineering question..." required />
            </label>

            <label className={styles.field}>
              <span>Option A *</span>
              <input value={optionA} onChange={(e) => setOptionA(e.target.value)} placeholder="Choice A text" required />
            </label>

            <label className={styles.field}>
              <span>Option B *</span>
              <input value={optionB} onChange={(e) => setOptionB(e.target.value)} placeholder="Choice B text" required />
            </label>

            <label className={styles.field}>
              <span>Option C (Optional)</span>
              <input value={optionC} onChange={(e) => setOptionC(e.target.value)} placeholder="Choice C text" />
            </label>

            <label className={styles.field}>
              <span>Option D (Optional)</span>
              <input value={optionD} onChange={(e) => setOptionD(e.target.value)} placeholder="Choice D text" />
            </label>

            <label className={styles.field}>
              <span>Correct Option</span>
              <select value={correctOption} onChange={(e) => setCorrectOption(e.target.value as any)}>
                <option value="A">Option A</option>
                <option value="B">Option B</option>
                <option value="C">Option C</option>
                <option value="D">Option D</option>
              </select>
            </label>

            <label className={styles.field} style={{ gridColumn: '1 / -1' }}>
              <span>Technical Explanation *</span>
              <textarea value={explanation} onChange={(e) => setExplanation(e.target.value)} rows={3} placeholder="Provide engineering context why the correct answer is right..." required />
            </label>

            <label className={styles.field}>
              <span>Related Lesson Slug</span>
              <input value={relatedLesson} onChange={(e) => setRelatedLesson(e.target.value)} placeholder="e.g. electronics-lab" />
            </label>

            <label className={styles.field}>
              <span>Tags (comma-separated)</span>
              <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="e.g. rtos, timing, stm32" />
            </label>

            <div className={styles.certActions} style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>
              <button type="submit" className={styles.submitBtn}>
                {editingId ? 'Save Question' : 'Add to Database'}
              </button>
              {editingId && (
                <button type="button" className={styles.cancelBtn} onClick={handleFormReset}>
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </section>

        <section className={styles.certSection}>
          <h2>Bulk Import / Export JSON</h2>
          <form onSubmit={handleImport} className={styles.formGrid}>
            <label className={styles.field} style={{ gridColumn: '1 / -1' }}>
              <span>Paste JSON Questions Array</span>
              <textarea
                value={importJson}
                onChange={(e) => setImportJson(e.target.value)}
                rows={4}
                placeholder='[{"id":"q-1","question":"Text","options":["A","B"],"correctAnswer":"A"}]'
              />
            </label>
            <div className={styles.certActions} style={{ gridColumn: '1 / -1' }}>
              <button type="submit" className={styles.submitBtn}>Import JSON</button>
              <button type="button" className={styles.cancelBtn} onClick={handleExport}>Export Current JSON</button>
            </div>
          </form>
          <div style={{ marginTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem' }}>
            <button type="button" className={styles.cancelBtn} style={{ color: 'var(--color-error)', borderColor: 'rgba(248,113,113,0.3)' }} onClick={handleResetDb}>
              Wipe custom questions & Restore defaults
            </button>
          </div>
        </section>
      </div>

      <div className={styles.certRightCol}>
        <section className={styles.certSection}>
          <h2>Local Question Performance</h2>
          <div className={styles.statsGrid} style={{ marginBottom: '1.5rem' }}>
            <div className={styles.statCard}>
              <span className={styles.statValue}>{questions.length}</span>
              <span className={styles.statLabel}>Active Pool Size</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statValue}>
                {analytics.averageScore > 0 ? analytics.averageScore + '%' : 'N/A'}
              </span>
              <span className={styles.statLabel}>Avg Correct Rate</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>Most Difficult Questions</h3>
              {analytics.mostDifficultQuestions.length === 0 ? (
                <p style={{ fontStyle: 'italic', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>No statistics collected yet.</p>
              ) : (
                <ol style={{ fontSize: '0.8rem', paddingLeft: '1.2rem', margin: 0, color: 'var(--color-text-secondary)' }}>
                  {analytics.mostDifficultQuestions.map((item, index) => (
                    <li key={index} style={{ marginBottom: '0.4rem' }}>
                      <span style={{ display: 'block', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '220px' }} title={item.question}>
                        {item.question}
                      </span>
                      <span style={{ color: 'var(--color-error)' }}>Error rate: {item.errorRate}%</span>
                    </li>
                  ))}
                </ol>
              )}
            </div>

            <div>
              <h3 style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>Category Popularity</h3>
              {analytics.categoryPopularity.length === 0 ? (
                <p style={{ fontStyle: 'italic', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>No attempts recorded.</p>
              ) : (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                  {analytics.categoryPopularity.map((item, index) => (
                    <li key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                      <span>{item.topic}</span>
                      <strong>{item.attempts} trials</strong>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>

        <section className={styles.certSection}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <h2>Question Repository ({filteredQuestions.length})</h2>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <select
                value={filterTopic}
                onChange={(e) => setFilterTopic(e.target.value)}
                style={{ background: 'rgba(0,0,0,0.2)', color: 'var(--color-text-secondary)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.3rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}
              >
                <option value="all">All Topics</option>
                {topicsList.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>

              <select
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
                style={{ background: 'rgba(0,0,0,0.2)', color: 'var(--color-text-secondary)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.3rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}
              >
                <option value="all">All Difficulties</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
          </div>

          <div className={styles.tableContainer} style={{ maxHeight: '420px', overflowY: 'auto' }}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th style={{ width: '8%' }}>ID</th>
                  <th style={{ width: '15%' }}>Topic</th>
                  <th style={{ width: '15%' }}>Diff</th>
                  <th style={{ width: '45%' }}>Question</th>
                  <th style={{ width: '17%' }}></th>
                </tr>
              </thead>
              <tbody>
                {filteredQuestions.map((q) => (
                  <tr key={q.id}>
                    <td>
                      <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--color-cyan)' }}>{q.id}</span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.8rem', fontWeight: 500 }}>{q.topic || 'General'}</span>
                    </td>
                    <td>
                      <span style={{
                        fontSize: '0.7rem',
                        padding: '1px 5px',
                        borderRadius: '3px',
                        background: q.difficulty === 'Beginner' ? 'rgba(52,211,153,0.1)' : q.difficulty === 'Intermediate' ? 'rgba(251,191,36,0.1)' : q.difficulty === 'Advanced' ? 'rgba(248,113,113,0.1)' : 'rgba(167,139,250,0.1)',
                        color: q.difficulty === 'Beginner' ? 'var(--color-success)' : q.difficulty === 'Intermediate' ? 'var(--color-warning)' : q.difficulty === 'Advanced' ? 'var(--color-error)' : '#c084fc',
                        fontWeight: 600
                      }}>
                        {q.difficulty}
                      </span>
                    </td>
                    <td>
                      <div
                        style={{ maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '0.85rem' }}
                        title={q.question}
                      >
                        {q.question}
                      </div>
                    </td>
                    <td>
                      <button className={styles.delLink} onClick={() => handleEdit(q)} style={{ color: 'var(--color-cyan)', marginRight: '0.5rem' }}>
                        Edit
                      </button>
                      <button className={styles.delLink} onClick={() => handleDelete(q.id)} style={{ color: 'var(--color-error)' }}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredQuestions.length === 0 && (
                  <tr>
                    <td colSpan={5} className={styles.empty}>No questions match the current filters.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}