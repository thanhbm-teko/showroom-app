import {
  SkuCondition,
  ConditionType,
  CategoryCondition,
  CombineCondition,
  Condition
} from '../../../model/Promotion/Condition';

export function makeSkuCondition(sku: string): SkuCondition {
  return {
    type: ConditionType.sku,
    sku
  };
}

export function makeCategoryCondition(category: string, includeChildren: boolean): CategoryCondition {
  return {
    type: ConditionType.category,
    category,
    includeChildren
  };
}

export function makeOneOfCondition(children: Condition[]): CombineCondition {
  return {
    type: ConditionType.oneOf,
    children
  };
}
