import React from 'react';
import { Input as RawInput } from 'antd';

export default function Search(props) {
  return <RawInput.Search {...props} />;
}