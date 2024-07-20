import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from "react-redux";
import type { RootState, AppDispatch } from "@app/store/store";

export const useDispatch = useReduxDispatch.withTypes<AppDispatch>();
export const useSelector = useReduxSelector.withTypes<RootState>();