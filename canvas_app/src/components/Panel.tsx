import React from 'react';
import Canvas from './Canvas';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
    currentRectangles,
    addRectangle,
    setColor
} from '../reducers/canvas/canvas'
export interface RecType {
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
    bkColor: string,
    isDragging: boolean
}

function Panel() {
    const dispatch = useAppDispatch();
    const rectangles = useAppSelector(currentRectangles);
    const addRec = () => {
        const x = Math.round(Math.random() * 400);
        const y = Math.round(Math.random() * 400);
        const r = Math.round(Math.random() * 255);
        const g = Math.round(Math.random() * 255);
        const b = Math.round(Math.random() * 255);
        const a = 0.5;
        var rectangle: RecType = {
            x: x,
            y: y,
            width: Math.round(Math.random() * (400 - x)),
            height: Math.round(Math.random() * (400 - y)),
            color: `RGB(${r}, ${g}, ${b})`,
            bkColor: `RGBA(${r}, ${g}, ${b}, ${a})`,
            isDragging: false
        }
        dispatch(addRectangle(rectangle));
    }

    const changeValue = (e: any, index: number) => {
       dispatch(setColor({index: index, color: e.target.value}));       
    }
  return (
    <div className='row'>
        <div className='row d-flex'>
            <div className='col-sm-4 justify-content-center align-self-center'>
                <button className='btn btn-outline-secondary' onClick={addRec}>Add Reactangle</button>
            </div>
            <div className='col-sm-8'>
                <Canvas />
            </div>
        </div>
        <div className='row'>
            {
                rectangles.map((rec, index) => {
                    console.log("---");
                    
                    return (
                        <div key={index}>
                            <span>reactnalge#{index}</span>
                            <span><input defaultValue={rec.bkColor} onChange={(e) => changeValue(e, index)}></input></span>
                        </div>
                    )
                })
            }
        </div>
    </div>
  );
}

export default Panel;
