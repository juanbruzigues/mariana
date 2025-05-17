import React from 'react';

const images = Array.from({ length: 7}, (_, i) => `foto${i + 1}.jpg`);

const Box = ({ src }) => (
  <div className="box">
    <span></span>
    <div className="content">
      <p><img src={`./imagens/${src}`} width="160px"  alt={`Foto ${src}`} /></p>
    </div>
  </div>
);

const Gallery = () => {
  return (
    <div className="container">
      {images.map((src, index) => (
        <Box key={index} src={src} />
      ))}
    </div>
  );
};

export default Gallery;
