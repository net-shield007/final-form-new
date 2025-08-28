import { z } from 'zod'

export const feedbackSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  date: z.string().min(1, 'Date is required'),
  emailId: z.string().email('Please enter a valid secondary email address'),
  contactName: z.string().min(1, 'Contact name is required'),
  companyName: z.string().min(1, 'Company name is required'),
  country: z.string().min(1, 'Country is required'),
  toolBuildQuality: z.number().min(1).max(10),
  packaging: z.number().min(1).max(10),
  onTimeDelivery: z.number().min(1).max(10),
  afterSalesSupport: z.number().min(1).max(10),
  productUsability: z.number().min(1).max(10),
  recommendationLikelihood: z.number().min(1).max(10),
  suggestions: z.string().min(10, 'Please provide at least 10 characters of feedback'),
})

export type FeedbackFormData = z.infer<typeof feedbackSchema>