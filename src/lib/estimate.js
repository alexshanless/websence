import { site } from '../config/site';

const { tiers, addOns } = site.pricing;

export function findTier(packageId) {
  return tiers.find((tier) => tier.id === packageId) ?? null;
}

export function findAddOn(addOnId) {
  return addOns.find((addOn) => addOn.id === addOnId) ?? null;
}

/**
 * The single place the estimate is calculated. Every number it uses comes from
 * site.pricing, so changing a price there changes it everywhere.
 *
 * The result is deliberately a floor, never a final sum:
 *  - `isFloor` is true when any selected line carries "from" pricing, which is
 *    most of them. The UI must qualify the number when it is true.
 *  - `monthly` is kept separate from `oneTime`. Maintenance is per month and
 *    adding it into a one-time subtotal would misstate both.
 *  - "Not sure yet" contributes no base, so `oneTime` covers add-ons only.
 */
export function calculateEstimate({ packageId, addOnIds = [] }) {
  const tier = findTier(packageId);
  // Custom is quoted, so it has no amount to add.
  const base = tier && tier.amount !== null ? tier.amount : 0;

  const selected = addOnIds
    .map((id) => findAddOn(id))
    .filter((addOn) => addOn !== null);

  const oneTimeAddOns = selected.filter((addOn) => !addOn.recurring);
  const monthlyAddOns = selected.filter((addOn) => addOn.recurring);

  const oneTime =
    base + oneTimeAddOns.reduce((total, addOn) => total + addOn.amount, 0);
  const monthly = monthlyAddOns.reduce((total, addOn) => total + addOn.amount, 0);

  const isFloor =
    Boolean(tier && tier.prefix) ||
    selected.some((addOn) => Boolean(addOn.prefix));

  return {
    base,
    hasBase: base > 0,
    oneTime,
    monthly,
    isFloor,
    selected,
    tier,
  };
}
