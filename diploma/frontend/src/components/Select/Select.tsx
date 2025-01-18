import React, { useId } from "react";
import classNames from "classnames";

import classes from "./styles.module.scss";
import { createPortal } from "react-dom";

export type Option = {
  value: string;
  label: string;
};
interface Props {
  value: string;
  options: Option[];

  onChange: (option: Option) => void;
}

export const Select = ({ options, value, onChange }: React.PropsWithChildren<Props>) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [isShow, setVisibility] = React.useState(false);

  React.useEffect(() => {
    const fn = (e) => {
      if (!ref.current?.contains(e.target)) {
        setVisibility(false);
      }
    };
    document.body.addEventListener("click", fn);

    return () => document.body.removeEventListener("click", fn);
  }, []);
  const onClick = () => {
    setVisibility((prev) => !prev);
  };

  const onSelect = (option: Option) => () => {
    onChange(option);
    setVisibility((prev) => !prev);
  };

  return (
    <div className={classes.select} ref={ref}>
      {isShow && createPortal(<div className={classes.overlay}></div>, document.body)}
      <button className={classes.selectBtn} onClick={onClick}>
        {value || options[0].label}
      </button>

      <div className={classNames(classes.selectDropdown, { [classes.selectDropdownActive]: isShow })}>
        {options.map((option) => (
          <div className={classes.selectDropdownItem} onClick={onSelect(option)} tabIndex={0}>
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};
