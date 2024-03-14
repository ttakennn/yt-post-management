import { Close } from '@mui/icons-material';
import { MuiFileInput, MuiFileInputProps } from 'mui-file-input';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

export type CustomMuiFileProps<T extends FieldValues> = MuiFileInputProps & {
  name: Path<T>;
  control: Control<T>;
};

function CustomMuiFileInput<T extends FieldValues>({
  name,
  control,
  onChange: externalOnChange,
}: Readonly<CustomMuiFileProps<T>>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        validate: (value: any) => value instanceof File,
      }}
      render={({ field, fieldState }) => {
        return (
          <MuiFileInput
            {...field}
            placeholder="Insert a File"
            helperText={fieldState.invalid ? 'File is invalid' : ''}
            error={fieldState.invalid}
            fullWidth
            clearIconButtonProps={{
              title: 'Remove',
              children: <Close fontSize="small" />,
            }}
            onChange={(event: any) => {
              field.onChange(event);
              externalOnChange?.(event);
            }}
          />
        );
      }}
    />
  );
}

export default CustomMuiFileInput;
