import React, { useState, useEffect } from 'react';
import styles from './Dropdown.module.css';

type Option = {
  name: string;
  value: string;
};

type Props = {
  options: Option[];
  selectedOption: Option;
  onChange: (option: Option) => void;
};

export const Dropdown = ({ options, selectedOption, onChange }: Props) => {
  const [selected, setSelected] = useState<Option>(selectedOption);

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const option = options.find((option) => option.value === e.target.value)!;
    onChange(option);
    setSelected(option);
  };

  useEffect(() => {
    setSelected(selectedOption);
  }, [selectedOption]);

  return (
    <div className={styles.dropdownContainer}>
      <select
        className={styles.dropdown}
        value={selected.value}
        onChange={handleOptionChange}
      >
        {options.map((option) => (
          <option key={option.name} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};
