import { MuiChipsInput, MuiChipsInputProps } from 'mui-chips-input';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

export type CustomMuiChipsProps<T extends FieldValues> = MuiChipsInputProps & {
  name: Path<T>;
  control: Control<T>;
};

function CustomMuiChipsInput<T extends FieldValues>({
  name,
  control,
  onChange: externalOnChange,
  ...rest
}: Readonly<CustomMuiChipsProps<T>>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <MuiChipsInput
            {...field}
            fullWidth
            hideClearAll
            label="Search Tags"
            placeholder="Enter Tags"
            helperText={fieldState.invalid ? 'Tag is invalid' : ''}
            error={fieldState.invalid}
            onChange={(event: any) => {
              field.onChange(event);
              externalOnChange?.(event);
            }}
            {...rest}
          />
        );
      }}
    />
  );
}

export default CustomMuiChipsInput;
