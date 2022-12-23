import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { AppStateType, AppDispatch } from './reactStore'
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";

// Use throughout your app instead of plain `useDispatch` and `useSelector`

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppThunkDispatch: () => ThunkDispatch<AppStateType, any, Action> = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector