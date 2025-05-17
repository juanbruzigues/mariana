import React from 'react';
import './Menu.scss'; // Importamos o arquivo SCSS para este componente

const Menu = () => {
  return (
    <ul>
      <li style={{ '--clr': '#ff6492' }}>
        <a href="#" data-text="&nbsp;Eu">&nbsp;Eu&nbsp;</a>
      </li>
      <li style={{ '--clr': '#ff6492' }}>
        <a href="#" data-text="&nbsp;Te">&nbsp;Te&nbsp;</a>
      </li>
      <li style={{ '--clr': '#ff6492' }}>
        <a href="#" data-text="&nbsp;Amo">&nbsp;Amo&nbsp;</a>
      </li>
      <li style={{ '--clr': '#ff6492' }}>
        <a href="#" data-text="&nbsp;Muito">&nbsp;Muito&nbsp;</a>
      </li>
    </ul>
  );
};

export default Menu;