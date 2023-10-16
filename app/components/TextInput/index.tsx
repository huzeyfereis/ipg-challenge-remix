import { TextField } from '@mui/material';

interface Props {
  id: string;
  label: string;
  name: string;
  type?: string;
  inputRef?: any;
}

export default function TextInput({ id, label, name, type, inputRef }: Props) {
  return (
    <TextField
      variant='outlined'
      margin='normal'
      required
      fullWidth
      id={id}
      label={label}
      name={name}
      type={type}
      inputRef={inputRef}
    />
  );
}
