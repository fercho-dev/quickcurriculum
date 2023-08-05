import React from 'react';


const ImageCarousel = ({ templates, onSelectImage }) => (
  <div
    className='flex h-44 md:h-52 lg:h-56'
  >
    {templates.map((template, index) => (
      <div key={index} onClick={() => onSelectImage(template.image, template.route)} className='m-2 h-44 w-32 md:h-52 md:w-40 lg:h-56 lg:w-44'>
        <img src={template.image} alt="" className="h-44 md:h-52 lg:h-56 cursor-pointer"/>
      </div>
    ))}
  </div>
);

export default ImageCarousel;

