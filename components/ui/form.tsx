import React, { ReactNode } from "react";

interface FormProps {
  children: ReactNode;
}

export const Form: React.FC<FormProps> = ({ children }) => {
  return <form>{children}</form>;
};

interface FormControlProps {
  children: ReactNode;
}

export const FormControl: React.FC<FormControlProps> = ({ children }) => {
  return <div>{children}</div>;
};

interface FormFieldProps {
  children: ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({ children }) => {
  return <div>{children}</div>;
};

interface FormItemProps {
  children: ReactNode;
}

export const FormItem: React.FC<FormItemProps> = ({ children }) => {
  return <div>{children}</div>;
};

interface FormLabelProps {
  children: ReactNode;
}

export const FormLabel: React.FC<FormLabelProps> = ({ children }) => {
  return <label>{children}</label>;
};

interface FormMessageProps {
  children: ReactNode;
}

export const FormMessage: React.FC<FormMessageProps> = ({ children }) => {
  return <span>{children}</span>;
};
