import Select, { MenuProps, OptionProps, Theme } from "react-select";

type options = {
  value: string;
  label: string;
};
interface MultiSelectProps {
  placeholder: string;
  onSearch?: (e: string) => void;
  options: options[];
  field: any;
  defaultValue?: string[];
}

const MultiSelect = ({
  placeholder,
  onSearch,
  options,
  field,
  defaultValue,
}: MultiSelectProps) => {
  const theme = (theme: Theme) => ({
    ...theme,
    colors: {
      ...theme.colors,
      primary25: "#d9d9d9",
      primary: "#e9590c",
    },
  });

  const Option = (props: OptionProps<options>) => {
    const { children, innerRef, innerProps } = props;
    return (
      <div
        ref={innerRef}
        className="bg-background p-3 hover:bg-muted cursor-pointer   "
        {...innerProps}
      >
        {children}
      </div>
    );
  };

  const Menu = (props: MenuProps<options, true>) => {
    const { children, innerRef, innerProps } = props;
    return (
      <div
        ref={innerRef}
        className="bg-background !border-muted border-2 absolute w-full z-50"
        {...innerProps}
      >
        {children}
      </div>
    );
  };
  console.log("from select", field.value);

  return (
    <div>
      <Select
        components={{ Option, Menu }}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: "bg-background",
          }),
          menu: (baseStyles, state) => ({
            ...baseStyles,
            display: "hidden",
          }),
          option: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: "bg-background",
          }),
          input: (baseStyles, state) => ({
            ...baseStyles,
            color: "text-muted",
          }),
          multiValue(baseStyles, props) {
            return {
              ...baseStyles,
              backgroundColor: "hsl(var(--secondary))",
            };
          },
          multiValueRemove(baseStyles, props) {
            return {
              backgroundColor: "transparent",
              paddingInline: "4px",
              display: "flex",
              boxSizing: "border-box",
              alignItems: "center",
              ":hover": {
                backgroundColor: "hsl(var(--destructive))",
              },
            };
          },
          multiValueLabel(baseStyles, props) {
            return {
              ...baseStyles,
              color: "hsl(var(--secondary-foreground)))",
            };
          },
        }}
        className="basic-multi-select"
        classNamePrefix="select"
        placeholder={placeholder}
        onInputChange={(e) => {
          onSearch && onSearch(e);
        }}
        defaultValue={field.value.map(
          (item: string) =>
            ({
              value: item,
              label: item,
            }) as options
        )}
        onChange={(e) => {
          let arr: string[] = [];
          e.map((item) => arr.push(item.value));
          field.onChange([...arr]);
        }}
        theme={theme}
        closeMenuOnSelect={false}
        isMulti
        name="colors"
        options={options}
      />
    </div>
  );
};
export default MultiSelect;
