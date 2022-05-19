import React, { useEffect } from 'react';
import styles from './index.module.css';

export function Example(props) {
  const { name } = props.name;
  useEffect(() => {
    console.log('useEffect');
  }, [name]);
  return (
    <div>
      {name}
    </div>
  )
}
