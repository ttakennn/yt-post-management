import { TextField, TextFieldProps } from '@mui/material';
import { ChangeEvent } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';

export type CustomTextFieldProps<T extends FieldValues> = TextFieldProps & {
  name: Path<T>;
  control: Control<T>;
};

function CustomTextField<T extends FieldValues>({
  name,
  control,
  size,
  margin,
  variant,
  ...rest
}: CustomTextFieldProps<T>) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({ name, control });

  return (
    <TextField
      fullWidth
      size={size}
      margin={margin}
      variant={variant}
      name={name}
      value={value}
      inputRef={ref}
      error={!!error}
      helperText={error?.message ?? ''}
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        onChange(event);
        rest.onChange?.(event);
      }}
      onBlur={onBlur}
      {...rest}
    />
  );
}
export default CustomTextField;
