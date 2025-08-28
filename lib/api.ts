const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface FeedbackFormData {
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
}

export interface FeedbackData extends FeedbackFormData {
  id: number;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  details?: string[];
}

class ApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Feedback API methods
  async submitFeedback(feedbackData: FeedbackFormData): Promise<ApiResponse<FeedbackData>> {
    return this.request<FeedbackData>('/feedback', {
      method: 'POST',
      body: JSON.stringify(feedbackData),
    });
  }

  async getAllFeedback(): Promise<ApiResponse<FeedbackData[]>> {
    return this.request<FeedbackData[]>('/feedback');
  }

  async getFeedbackById(id: number): Promise<ApiResponse<FeedbackData>> {
    return this.request<FeedbackData>(`/feedback/${id}`);
  }

  async updateFeedback(id: number, feedbackData: Partial<FeedbackFormData>): Promise<ApiResponse<FeedbackData>> {
    return this.request<FeedbackData>(`/feedback/${id}`, {
      method: 'PUT',
      body: JSON.stringify(feedbackData),
    });
  }

  async deleteFeedback(id: number): Promise<ApiResponse<void>> {
    return this.request<void>(`/feedback/${id}`, {
      method: 'DELETE',
    });
  }

  async getAnalytics(): Promise<ApiResponse<any>> {
    return this.request<any>('/feedback/analytics');
  }

  async checkHealth(): Promise<ApiResponse<any>> {
    const url = `${API_BASE_URL.replace('/api', '')}/health`;
    const response = await fetch(url);
    return response.json();
  }
}

export const apiClient = new ApiClient();