import { PartialInfoProduct } from '../../model/Product';
import { Condition, ConditionType, SkuCondition, CategoryCondition, CombineCondition } from '../../model/Promotion/Condition';

export function checkCondition(product: PartialInfoProduct, condition: Condition): boolean {
  let res = false;
  if (condition.type === ConditionType.sku) {
    res = checkSkuCondition(product, <SkuCondition>condition);
  } else if (condition.type === ConditionType.category) {
    res = checkCategoryCondition(product, <CategoryCondition>condition);
  } else if (condition.type === ConditionType.oneOf) {
    res = checkOneOfCondition(product, <CombineCondition>condition);
  }

  return res;
}

function checkSkuCondition(product: PartialInfoProduct, condition: SkuCondition): boolean {
  return condition.sku === product.sku;
}

function checkCategoryCondition(product: PartialInfoProduct, condition: CategoryCondition): boolean {
  return (
    (!condition.includeChildren && condition.category === product.category) ||
    (condition.includeChildren && product.category.includes(condition.category))
  );
}

function checkOneOfCondition(product: PartialInfoProduct, condition: CombineCondition): boolean {
  let res = false;
  for (let c of (<CombineCondition>condition).children) {
    res = res || checkCondition(product, c);
  }
  return res;
}
