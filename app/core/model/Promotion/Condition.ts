export enum ConditionType {
  allOf = 'allOf',
  oneOf = 'oneOf',
  sku = 'sku',
  category = 'category',
  boolean = 'boolean'
}

export interface Condition {
  type: ConditionType;
}

export interface CombineCondition extends Condition {
  children: Condition[];
}

export interface SkuCondition extends Condition {
  sku: string;
}

export interface CategoryCondition extends Condition {
  category: string;
  includeChildren: boolean;
}

export interface BooleanCondition extends Condition {
  value: boolean;
}
