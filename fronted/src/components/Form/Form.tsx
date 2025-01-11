import React from "react";
import classes from "./styles.module.scss";
interface Props {}

export const Form = (props: React.PropsWithChildren<Props>) => {
  return <form {...props} className={classes.form}></form>;
};

export const FormField = (props: React.PropsWithChildren) => {
  return <div className={classes.formRow}>{props.children}</div>;
};

interface TextFieldProps {
  label?: string;
  value: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextField = ({ label, value, placeholder = " ", onChange }: TextFieldProps) => {
  return (
    <div className={classes.textField}>
      <input
        id="email"
        type="text"
        className={classes.textFieldInput}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {label && (
        <label htmlFor="email" className={classes.textFieldLabel}>
          {label}
        </label>
      )}
    </div>
  );
};
