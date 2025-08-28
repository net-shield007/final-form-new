import pool from '../config/database';
import { FeedbackData, FeedbackFormData } from '../types/feedback';

export class FeedbackModel {
  static async create(feedbackData: FeedbackFormData): Promise<FeedbackData> {
    const query = `
      INSERT INTO feedback (
        email, date, email_id, contact_name, company_name, country,
        tool_build_quality, packaging, on_time_delivery, after_sales_support,
        product_usability, recommendation_likelihood, suggestions
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING *
    `;

    const values = [
      feedbackData.email,
      feedbackData.date,
      feedbackData.emailId,
      feedbackData.contactName,
      feedbackData.companyName,
      feedbackData.country,
      feedbackData.toolBuildQuality,
      feedbackData.packaging,
      feedbackData.onTimeDelivery,
      feedbackData.afterSalesSupport,
      feedbackData.productUsability,
      feedbackData.recommendationLikelihood,
      feedbackData.suggestions
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async findAll(): Promise<FeedbackData[]> {
    const query = 'SELECT * FROM feedback ORDER BY created_at DESC';
    const result = await pool.query(query);
    return result.rows;
  }

  static async findById(id: number): Promise<FeedbackData | null> {
    const query = 'SELECT * FROM feedback WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  static async update(id: number, feedbackData: Partial<FeedbackFormData>): Promise<FeedbackData | null> {
    const fields: string[] = [];
    const values = [];
    let paramCount = 1;

    // Build dynamic update query
    Object.entries(feedbackData).forEach(([key, value]) => {
      if (value !== undefined) {
        // Convert camelCase to snake_case for database columns
        const dbField = key.replace(/([A-Z])/g, '_$1').toLowerCase();
        fields.push(`${dbField} = $${paramCount}`);
        values.push(value);
        paramCount++;
      }
    });

    if (fields.length === 0) {
      throw new Error('No fields to update');
    }

    const query = `
      UPDATE feedback 
      SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $${paramCount}
      RETURNING *
    `;

    values.push(id);
    const result = await pool.query(query, values);
    return result.rows[0] || null;
  }

  static async delete(id: number): Promise<boolean> {
  const query = 'DELETE FROM feedback WHERE id = $1';
  const result = await pool.query(query, [id]);
  return (result.rowCount ?? 0) > 0;
}


  static async getAnalytics(): Promise<any> {
    const query = `
      SELECT 
        COUNT(*) as total_responses,
        AVG(tool_build_quality) as avg_tool_quality,
        AVG(packaging) as avg_packaging,
        AVG(on_time_delivery) as avg_delivery,
        AVG(after_sales_support) as avg_support,
        AVG(product_usability) as avg_usability,
        AVG(recommendation_likelihood) as avg_recommendation,
        AVG((tool_build_quality + packaging + on_time_delivery + after_sales_support + product_usability + recommendation_likelihood) / 6.0) as avg_overall
      FROM feedback
    `;
    
    const result = await pool.query(query);
    return result.rows[0];
  }
}