import React, { useState, useEffect } from "react";
import Slide from "./Slide";
import data from "../Data";
const Slider = () => {
  const [slide, setSlide] = useState(data);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSelected((oldValue) => {
        if (oldValue + 1 === slide.length) {
          return 0
        } else {
          return oldValue + 1
        }
      })
    }, 5000);

    return () => clearInterval(timer)
  }, [selected]);


  const showNext = () => {
    setSelected((oldValue) => {
      if (oldValue + 1 === slide.length) {
        return 0
      } else {
        return oldValue + 1
      }
    })
  }


  const showPerv = () => {
    setSelected((oldValue) => {
      if (oldValue - 1 < 0) {
        return slide.length - 1
      } else {
        return oldValue - 1
      }
    })
  }

  return (
    <div className="container slider">
      {slide.map((slide, index) => {
        //Cambio classe in base alla posizione dell'elemento rispetto a quello attivo
        let positionClass = "";
        if (index === selected) {
          positionClass = "active";
        } else if (
          selected === index + 1 ||
          (selected === 0 && index === slide.length - 1)
        ) {
          positionClass = "prev";
        } else {
          positionClass = "next";
        }
        return (
          <Slide key={slide.id} {...slide} classes={positionClass} />
        );
      })}
      <div className="btn-group slider-btn-group">
        <button className="btn btn-slider prev-slide" onClick={showPerv}>
          prev
        </button>
        <button className="btn btn-slider next-slide" onClick={showNext}>
          next
        </button>
      </div>
    </div>
  );
};

export default Slider;
