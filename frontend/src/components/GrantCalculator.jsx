import React, { useState } from 'react';

const MAJORS = [
  'Информационные технологии',
  'Компьютерная инженерия',
  'Software Engineering',
  'Кибербезопасность'
];

export const GrantCalculator = () => {
  const [major, setMajor] = useState(MAJORS[0]);
  const [scores, setScores] = useState({
    mathLit: '',
    readingLit: '',
    historyKZ: '',
    subject1: '',
    subject2: ''
  });
  const [errors, setErrors] = useState({});

  const handleScoreChange = (field, value) => {
    const num = Number(value);
    const maxLimit = (field === 'mathLit' || field === 'readingLit' || field === 'historyKZ') ? 15 : 50;

    if (num < 0 || num > maxLimit) {
      setErrors(prev => ({ ...prev, [field]: `Балл должен быть от 0 до ${maxLimit}` }));
    } else {
      setErrors(prev => ({ ...prev, [field]: null }));
    }

    setScores(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div style={{ maxWidth: '500px', margin: '20px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>Калькулятор шанса гранта Zerdeli</h2>
      
      <div style={{ marginBottom: '15px' }}>
        <label>Специальность:</label>
        <select value={major} onChange={(e) => setMajor(e.target.value)} style={{ width: '100%', padding: '8px', marginTop: '5px' }}>
          {MAJORS.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      <h4>Обязательные предметы (макс. 15):</h4>
      {['mathLit', 'readingLit', 'historyKZ'].map((field) => (
        <div key={field} style={{ marginBottom: '10px' }}>
          <input
            type="number"
            placeholder={field}
            value={scores[field]}
            onChange={(e) => handleScoreChange(field, e.target.value)}
            style={{ width: '100%', padding: '8px' }}
          />
          {errors[field] && <div style={{ color: 'red', fontSize: '12px' }}>{errors[field]}</div>}
        </div>
      ))}

      <h4>Профильные предметы (макс. 50):</h4>
      {['subject1', 'subject2'].map((field) => (
        <div key={field} style={{ marginBottom: '10px' }}>
          <input
            type="number"
            placeholder={field}
            value={scores[field]}
            onChange={(e) => handleScoreChange(field, e.target.value)}
            style={{ width: '100%', padding: '8px' }}
          />
          {errors[field] && <div style={{ color: 'red', fontSize: '12px' }}>{errors[field]}</div>}
        </div>
      ))}
    </div>
  );
};