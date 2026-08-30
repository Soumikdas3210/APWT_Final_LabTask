export type SortOption = 'default' | 'name' | 'gpa';

interface SortControlsProps {
  sortBy: SortOption;
  onSortChange: (value: SortOption) => void;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'default', label: 'Default' },
  { value: 'name', label: 'Name (A–Z)' },
  { value: 'gpa', label: 'GPA (High–Low)' },
];

function SortControls({ sortBy, onSortChange }: SortControlsProps) {
  return (
    <div className="sort-controls">
      <span className="sort-label">Sort</span>
      {SORT_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          className={sortBy === option.value ? 'sort-button sort-button-active' : 'sort-button'}
          onClick={() => onSortChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default SortControls;