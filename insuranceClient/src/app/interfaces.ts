export interface IPolicy {
  policy_id: string;
  customer_id: string;
  fuel: string;
  vehicle_segment: string;
  premium: string;
  bodily_injury_liability: string;
  personal_injury_protection: string;
  property_damage_liability: string;
  collision: string;
  comprehensive: string;
  customer_gender: string;
  customer_income_group: string;
  customer_region: string;
  customer_marital_status: string;
  date_of_purchase: Date;
}
