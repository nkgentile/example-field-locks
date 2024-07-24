import { type InputProps, isStringInputProps } from "sanity";

import { useFieldLock } from "./FieldLockContext";

export function Input(props: InputProps) {
  const { isLocked } = useFieldLock();
  const { schemaType, renderDefault } = props;

  if (isStringInputProps(props) && schemaType.locked && isLocked) {
    return renderDefault({
      ...props,
      readOnly: true,
      elementProps: { ...props.elementProps, readOnly: true },
    });
  }

  return renderDefault(props);
}
