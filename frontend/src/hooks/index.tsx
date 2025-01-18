import React from "react";

export function useToggle(defaultValue = false) {
  const [isShow, setShow] = React.useState(defaultValue);

  const toggleValue = React.useCallback((newValue?: boolean) => {
    if (newValue !== undefined) {
      setShow(newValue);

      return;
    }

    setShow((prev) => !prev);
  }, []);

  return [isShow, toggleValue] as const;
}
