import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { RecType } from '../../components/Panel';

export interface canvasState {
  rectangle: Array<RecType>,
  startX: number,
  startY: number,
}

const initialState: canvasState = {
  rectangle: [],
  startX: 0,
  startY: 0,
};

export const canvasSlice = createSlice({
    name: 'Canvas',
    initialState,
    reducers: {
        addRectangle: (state, action: PayloadAction<RecType>) => {
            state.rectangle.push(action.payload);
        },
        removeRectangle: (state, action: PayloadAction<number>) => {
            state.rectangle.slice(action.payload, 1);
        },
        setDragable: (state, action: PayloadAction<number>) => {
          state.rectangle[action.payload].isDragging = true;
        },
        setAllNoneDragable: (state) => {
          for (let index = 0; index < state.rectangle.length; index++) {
            state.rectangle[index].isDragging = false;
          }
        },
        setRectanglePos: (state, action: PayloadAction<any>) => {
          state.rectangle[action.payload.index].x += action.payload.dx;
          state.rectangle[action.payload.index].y += action.payload.dy;
        },
        setStartPos: (state, action: PayloadAction<any>) => {
          state.startX = action.payload.startX;
          state.startY = action.payload.startY;
        },
        initPos: (state) => {        
          state.startX = 0;
          state.startY = 0;
        },
        setColor: (state, action: PayloadAction<any>) => {
          state.rectangle[action.payload.index].bkColor = action.payload.color;
        },
    }
});

export const { addRectangle, removeRectangle, setDragable, setAllNoneDragable, setRectanglePos, setStartPos, initPos, setColor } = canvasSlice.actions;
export const currentRectangles = (state: RootState) => state.canvas.rectangle;
export const currentStartX = (state: RootState) => state.canvas.startX;
export const currentStartY = (state: RootState) => state.canvas.startY;

export default canvasSlice.reducer;
