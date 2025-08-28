import { Request, Response } from 'express';
import { FeedbackModel } from '../models/feedbackModel';
import { feedbackSchema } from '../validation/feedbackValidation';
import { FeedbackFormData } from '../types/feedback';

export class FeedbackController {
  static async create(req: Request, res: Response): Promise<void> {
    try {
      // Validate request body
      const { error, value } = feedbackSchema.validate(req.body);
      
      if (error) {
        res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: error.details.map((detail: { message: any; }) => detail.message)
        });
        return;
      }

      const feedbackData: FeedbackFormData = value;
      const newFeedback = await FeedbackModel.create(feedbackData);

      res.status(201).json({
        success: true,
        message: 'Feedback submitted successfully!',
        data: newFeedback
      });
    } catch (error) {
      console.error('Error creating feedback:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const feedback = await FeedbackModel.findAll();
      
      res.status(200).json({
        success: true,
        data: feedback
      });
    } catch (error) {
      console.error('Error fetching feedback:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch feedback'
      });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          error: 'Invalid feedback ID'
        });
        return;
      }

      const feedback = await FeedbackModel.findById(id);
      
      if (!feedback) {
        res.status(404).json({
          success: false,
          error: 'Feedback not found'
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: feedback
      });
    } catch (error) {
      console.error('Error fetching feedback by ID:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          error: 'Invalid feedback ID'
        });
        return;
      }

      const updatedFeedback = await FeedbackModel.update(id, req.body);
      
      if (!updatedFeedback) {
        res.status(404).json({
          success: false,
          error: 'Feedback not found'
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Feedback updated successfully!',
        data: updatedFeedback
      });
    } catch (error) {
      console.error('Error updating feedback:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to update feedback'
      });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          error: 'Invalid feedback ID'
        });
        return;
      }

      const deleted = await FeedbackModel.delete(id);
      
      if (!deleted) {
        res.status(404).json({
          success: false,
          error: 'Feedback not found'
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Feedback deleted successfully!'
      });
    } catch (error) {
      console.error('Error deleting feedback:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to delete feedback'
      });
    }
  }

  static async getAnalytics(req: Request, res: Response): Promise<void> {
    try {
      const analytics = await FeedbackModel.getAnalytics();
      
      res.status(200).json({
        success: true,
        data: analytics
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch analytics'
      });
    }
  }
}