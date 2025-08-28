import Joi from 'joi';

export const feedbackSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please enter a valid email address',
    'any.required': 'Email is required'
  }),
  date: Joi.string().isoDate().required().messages({
    'string.isoDate': 'Please enter a valid date',
    'any.required': 'Date is required'
  }),
  emailId: Joi.string().email().required().messages({
    'string.email': 'Please enter a valid secondary email address',
    'any.required': 'Secondary email is required'
  }),
  contactName: Joi.string().min(1).max(255).required().messages({
    'string.min': 'Contact name is required',
    'string.max': 'Contact name must be less than 255 characters',
    'any.required': 'Contact name is required'
  }),
  companyName: Joi.string().min(1).max(255).required().messages({
    'string.min': 'Company name is required',
    'string.max': 'Company name must be less than 255 characters',
    'any.required': 'Company name is required'
  }),
  country: Joi.string().min(1).max(100).required().messages({
    'string.min': 'Country is required',
    'string.max': 'Country name must be less than 100 characters',
    'any.required': 'Country is required'
  }),
  toolBuildQuality: Joi.number().integer().min(1).max(10).required().messages({
    'number.min': 'Tool build quality rating must be between 1 and 10',
    'number.max': 'Tool build quality rating must be between 1 and 10',
    'any.required': 'Tool build quality rating is required'
  }),
  packaging: Joi.number().integer().min(1).max(10).required().messages({
    'number.min': 'Packaging rating must be between 1 and 10',
    'number.max': 'Packaging rating must be between 1 and 10',
    'any.required': 'Packaging rating is required'
  }),
  onTimeDelivery: Joi.number().integer().min(1).max(10).required().messages({
    'number.min': 'On-time delivery rating must be between 1 and 10',
    'number.max': 'On-time delivery rating must be between 1 and 10',
    'any.required': 'On-time delivery rating is required'
  }),
  afterSalesSupport: Joi.number().integer().min(1).max(10).required().messages({
    'number.min': 'After sales support rating must be between 1 and 10',
    'number.max': 'After sales support rating must be between 1 and 10',
    'any.required': 'After sales support rating is required'
  }),
  productUsability: Joi.number().integer().min(1).max(10).required().messages({
    'number.min': 'Product usability rating must be between 1 and 10',
    'number.max': 'Product usability rating must be between 1 and 10',
    'any.required': 'Product usability rating is required'
  }),
  recommendationLikelihood: Joi.number().integer().min(1).max(10).required().messages({
    'number.min': 'Recommendation likelihood rating must be between 1 and 10',
    'number.max': 'Recommendation likelihood rating must be between 1 and 10',
    'any.required': 'Recommendation likelihood rating is required'
  }),
  suggestions: Joi.string().min(10).max(5000).required().messages({
    'string.min': 'Please provide at least 10 characters of feedback',
    'string.max': 'Suggestions must be less than 5000 characters',
    'any.required': 'Suggestions are required'
  })
});