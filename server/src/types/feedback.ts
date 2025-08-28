export interface FeedbackData {
  id?: number;
  email: string;
  date: string;
  email_id: string;
  contact_name: string;
  company_name: string;
  country: string;
  tool_build_quality: number;
  packaging: number;
  on_time_delivery: number;
  after_sales_support: number;
  product_usability: number;
  recommendation_likelihood: number;
  suggestions: string;
  created_at?: string;
  updated_at?: string;
}

export interface FeedbackFormData {
  email: string;
  date: string;
  emailId: string;
  contactName: string;
  companyName: string;
  country: string;
  toolBuildQuality: number;
  packaging: number;
  onTimeDelivery: number;
  afterSalesSupport: number;
  productUsability: number;
  recommendationLikelihood: number;
  suggestions: string;
}