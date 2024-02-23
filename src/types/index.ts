/* 公共的ts类型 */

import type { FormItemRule } from "element-plus";

export interface Validate {
  type?: string;
  required?: boolean;
  validator?: any;
}
export type FormValidateFn = (arg0: Validate) => Array<FormItemRule>;
