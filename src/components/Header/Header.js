import React from 'react';
import './Header.css';

export default function Header({ title }) {
  // 테스트 용
  return (
    <>
      <h1 className="header" data-testid="header-1">
        {title}
      </h1>
      <h3 className="header" title="Header">
        Cats
      </h3>
    </>
  );

  // 원본
  //   return (
  //       <h1 className="header">
  //         {title}
  //       </h1>
  //   );
}
