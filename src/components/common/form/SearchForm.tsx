interface SearchFormProps {
  name: string;
  type: string;
  value: string;
  onChange: ({ target }: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const SearchForm = ({
  name,
  type,
  value,
  onChange,
  placeholder,
}: SearchFormProps) => {
  return (
    <div className="mb-3 d-flex w-full">
      <input
        className="w-100  tw-bg-cyan-300/35 tw-rounded-md"
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

SearchForm.defaultProps = {
  type: "text",
};

export default SearchForm;
