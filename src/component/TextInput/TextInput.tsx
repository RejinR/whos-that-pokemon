import { Component } from 'solid-js';

const TextInput: Component<{
  onChange: (val: string) => void;
  value: string;
}> = (props) => {
  const onChange = (e) => {
    props.onChange(e.target.value);
  };
  return (
    <input
      class="input w-full h-12 rounded-lg border-none text-2xl text-center outline-none"
      value={props.value}
      onChange={onChange}
    />
  );
};

export default TextInput;
