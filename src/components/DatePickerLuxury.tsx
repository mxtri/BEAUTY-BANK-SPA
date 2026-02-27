import React from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const DatePickerLuxury: React.FC<Props> = ({ value, onChange }) => {

  const formatDisplayDate = (date: string) => {
    if (!date) return "JJ / MM / AAAA";

    const d = new Date(date);
    return d.toLocaleDateString("fr-FR");
  };

  return (
    <div className="luxury-date-box">

      <label>Date du rendez-vous</label>

      <div className="luxury-date-display">
        {formatDisplayDate(value)}
      </div>

      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="luxury-date-hidden"
      />

    </div>
  );
};

export default DatePickerLuxury;