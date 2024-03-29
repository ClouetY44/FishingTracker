import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import React from 'react'
import Slider from 'react-touch-drag-slider'

import { fetchCatch } from "../../../store/slice/catch";

function SliderHome() {

    const dispatch = useDispatch()
    const {list} = useSelector((state) => state.catch)
    
    useEffect(() => {
        dispatch(fetchCatch())
    }, [])

  return (
        <Slider
          onSlideComplete={(i) => {
            console.log('finished dragging, current slide is', i)
          }}
          onSlideStart={(i) => {
            console.log('started dragging on slide', i)
          }}
          activeIndex={0}
          threshHold={100}
          transition={0.5}
          scaleOnDrag={true}
        >
          {list.map((element, index) => (
            <img src={`${import.meta.env.VITE_API_URL}/img/${element.Src}`} key={element.id} alt={element.Alt} />
          ))}
        </Slider>
  )
}

export default SliderHome