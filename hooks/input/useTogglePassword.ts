import { MouseEventHandler, useState } from 'react';

export default function useTogglePassword() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword: MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    event.preventDefault();
  };

  return {
    handleClickShowPassword,
    handleMouseDownPassword,
    showPassword,
  };
}
