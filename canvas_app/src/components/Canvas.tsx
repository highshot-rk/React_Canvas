import React, { useRef, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { RecType } from './Panel';
import {
  currentRectangles,
  setDragable,
  setAllNoneDragable,
  setRectanglePos,
  initPos,
  setStartPos,
  currentStartY,
  currentStartX
} from '../reducers/canvas/canvas'


function Canvas() {
  const dispatch = useAppDispatch();
  const rectangles = useAppSelector(currentRectangles);
  let startX = useAppSelector(currentStartX);
  let startY = useAppSelector(currentStartY);

  const canvas = useRef<HTMLCanvasElement>(null);
  let ctx: any = null;
  const drawRect = (rectangle_info: RecType) => {
    const { x, y, width, height, color, bkColor } = rectangle_info;
    ctx.beginPath();
    ctx.fillStyle = bkColor;
    ctx.fillRect( x, y, width, height);
    ctx.strokeStyle = color;
    ctx.rect( x, y, width, height);   
    ctx.stroke();
    ctx.restore();
  };

  const isHit = (rectangle_info:RecType, m_x: number, m_y: number) => {
    let { x, y, width, height } = rectangle_info;
      if (m_x > x && m_y > y && m_x < (x + width) && m_y < (y + height)) {
        return true;
      }
    return false;
  }

  useEffect(() => {  
    const canvasEle:any = canvas.current;
    ctx = canvasEle.getContext("2d");
    ctx.clearRect(0, 0, canvasEle.width, canvasEle.height);
    rectangles.length > 0 && rectangles.map(rec_info => {
      drawRect(rec_info);
    });
    const handle_down = (e: any) => {
      dispatch(setStartPos({startX: e.offsetX, startY: e.offsetY}))      
      rectangles.map((rec_info, index) => {
        if(isHit(rec_info, e.offsetX, e.offsetY)){
          dispatch(setDragable(index));
        }
      })
    }
    const hangle_up = (e: any) => {
      let dx = e.offsetX - startX;
      let dy = e.offsetY - startY;     
      dispatch(setStartPos({startX: e.offsetX, startY: e.offsetY}))
      rectangles.map((rec_info, index) => {
        if(rec_info.isDragging){
          dispatch(setRectanglePos({index: index, dx: dx , dy: dy,}));
        }
      })
      dispatch(setAllNoneDragable());
      dispatch(initPos());
    }
    canvasEle.removeEventListener('mousedown', handle_down);
    canvasEle.addEventListener('mousedown', handle_down)

    canvasEle.removeEventListener('mouseup', hangle_up);
    canvasEle.addEventListener('mouseup', hangle_up)
  }, [rectangles]); // dependency with rectangles variable
  
  return (
    <>
        <canvas ref={canvas} width="400" height="400" style={{border:"1px solid #000000"}}></canvas>
    </>
  );
}

export default Canvas;
