import { Action } from "@reduxjs/toolkit";
import { StatusFetch } from "./enums";

export interface GenericFeature {
    statusFetch: StatusFetch;
    messageError: string;
}

export interface ActionPayload<T> extends Action {
    payload: T
}
