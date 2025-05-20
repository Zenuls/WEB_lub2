import { useState } from 'react';

const sortData = (data, sortFields) => {
  if (!sortFields.length) return data;

  return [...data].sort((a, b) => {
    for (const { key, desc } of sortFields) {
      const valA = a[key];
      const valB = b[key];

      if (valA > valB) return desc ? -1 : 1;
      if (valA < valB) return desc ? 1 : -1;
    }
    return 0;
  });
};

const Sort = (props) => {
  
  
  const fields = Object.keys(props.list[0]);

  const [sortFields, setSortFields] = useState([
    { key: '', desc: false },
    { key: '', desc: false },
    { key: '', desc: false }
  ]);

  const updateSortField = (index, field, value) => {
    setSortFields(prev => 
    field === 'key' && value === '' 
      ? prev.map((item, i) => 
          i >= index 
            ? { key: '', desc: false } 
            : item
        )
      : prev.map((item, i) => 
          i === index 
            ? { ...item, [field]: value } 
            : item
        )
  );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validSorts = sortFields.filter(s => s.key);
    const sortedData = sortData(props.fullData, validSorts);
    props.sorting(sortedData);
  };

  const handleReset = () => {
    props.sorting(props.fullData);
    setSortFields([
      { key: '', desc: false },
      { key: '', desc: false },
      { key: '', desc: false }
    ]);
    
  };

  const getAvailableFields = (level) => {
    const selected = sortFields.map((s, i) => i !== level ? s.key : null);
    return fields.filter(f => !selected.includes(f));
  };

  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
      {sortFields.map((sf, i) => (
        <div key={i}>
          <label>Уровень {i + 1} сортировки: </label>
          <select
            value={sf.key}
            onChange={(e) => updateSortField(i, 'key', e.target.value)}
            disabled={i > 0 && !sortFields[i - 1].key}
          >
            <option value="">Нет</option>
            {getAvailableFields(i).map(f => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>

          <label>
            <input
              type="checkbox"
              checked={sf.desc}
              onChange={(e) => updateSortField(i, 'desc', e.target.checked)}
              disabled={!sf.key}
            />
            По убыванию
          </label>
        </div>
      ))}
      <p>
        <button type="submit">Сортировать</button>
        <button type="reset">Сбросить</button>
      </p>
    </form>
  );
};

export default Sort;
