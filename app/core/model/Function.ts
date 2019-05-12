import { ApiResult } from './ResultCode';

export type DecisionCallback = () => Promise<boolean>;
export type IdGeneratorFunc = () => string;
export type VoidFunc = () => void;
export type ApiFunc = () => Promise<ApiResult>;
