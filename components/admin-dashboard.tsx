"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, Eye, Trash2, Search, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { apiClient, FeedbackData } from "@/lib/api";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const [feedback, setFeedback] = useState<FeedbackData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackData | null>(
    null
  );

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const result = await apiClient.getAllFeedback();
      if (result.success) {
        setFeedback(result.data || []);
      } else {
        toast.error(result.error || "Failed to fetch feedback");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to fetch feedback"
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteFeedback = async (id: number) => {
    if (!confirm("Are you sure you want to delete this feedback?")) return;

    try {
      const result = await apiClient.deleteFeedback(id);

      if (result.success) {
        setFeedback((prev) => prev.filter((f) => f.id !== id));
        toast.success(result.message || "Feedback deleted successfully");
      } else {
        toast.error(result.error || "Failed to delete feedback");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Network error occurred"
      );
    }
  };

  const exportToCSV = () => {
    if (feedback.length === 0) {
      toast.error("No data to export");
      return;
    }

    const headers = [
      "ID",
      "Email",
      "Date",
      "Secondary Email",
      "Contact Name",
      "Company",
      "Country",
      "Tool Quality",
      "Packaging",
      "Delivery",
      "Support",
      "Usability",
      "Recommendation",
      "Suggestions",
      "Created At",
    ];

    const csvContent = [
      headers.join(","),
      ...feedback.map((f) =>
        [
          f.id,
          `"${f.email}"`,
          f.date,
          `"${f.email_id}"`, // FIXED camelCase
          `"${f.contact_name}"`,
          `"${f.company_name}"`,
          `"${f.country}"`,
          f.tool_build_quality,
          f.packaging,
          f.on_time_delivery,
          f.after_sales_support,
          f.product_usability,
          f.recommendation_likelihood,
          `"${f.suggestions?.replace(/"/g, '""') || ""}"`,
          f.created_at,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `tritorc-feedback-${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Data exported successfully");
  };

  const getAverageRating = (field: keyof FeedbackData): string => {
    if (feedback.length === 0) return "0.0"; // always a string
    const total = feedback.reduce(
      (sum, f) => sum + ((f[field] as number) || 0),
      0
    );
    return (total / feedback.length).toFixed(1);
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 8) return "bg-green-500";
    if (rating >= 6) return "bg-yellow-500";
    return "bg-red-500";
  };

  const filteredFeedback = feedback.filter(
    (f) =>
      f.contact_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Manage and analyze customer feedback
            </p>
          </div>
          <Button onClick={exportToCSV} className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Responses
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{feedback.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg Tool Quality
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {getAverageRating("tool_build_quality")}/10
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg Recommendation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {getAverageRating("recommendation_likelihood")}/10
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg Overall Rating
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(
                  (parseFloat(getAverageRating("tool_build_quality")) +
                    parseFloat(getAverageRating("packaging")) +
                    parseFloat(getAverageRating("on_time_delivery")) +
                    parseFloat(getAverageRating("after_sales_support")) +
                    parseFloat(getAverageRating("product_usability")) +
                    parseFloat(getAverageRating("recommendation_likelihood"))) /
                  6
                ).toFixed(1)}
                /10
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Feedback Responses</CardTitle>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, company, or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 w-80"
                  />
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Contact</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Ratings</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFeedback.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{item.contact_name}</div>
                          <div className="text-sm text-gray-500">
                            {item.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{item.company_name}</TableCell>
                      <TableCell>{item.country}</TableCell>
                      <TableCell>
                        {new Date(item.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {[
                            item.tool_build_quality,
                            item.packaging,
                            item.on_time_delivery,
                            item.after_sales_support,
                            item.product_usability,
                            item.recommendation_likelihood,
                          ].map((rating, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className={`${getRatingColor(rating)} text-white`}
                            >
                              {rating}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedFeedback(item)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => item.id && deleteFeedback(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Feedback Detail Dialog */}
        <Dialog
          open={!!selectedFeedback}
          onOpenChange={() => setSelectedFeedback(null)}
        >
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Feedback Details</DialogTitle>
            </DialogHeader>

            {selectedFeedback && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">Contact Information</h3>
                    <div className="space-y-1 text-sm">
                      <p>
                        <strong>Name:</strong> {selectedFeedback.contact_name}
                      </p>
                      <p>
                        <strong>Company:</strong> {selectedFeedback.company_name}
                      </p>
                      <p>
                        <strong>Country:</strong> {selectedFeedback.country}
                      </p>
                      <p>
                        <strong>Primary Email:</strong> {selectedFeedback.email}
                      </p>
                      <p>
                        <strong>Secondary Email:</strong>{" "}
                        {selectedFeedback.email_id}
                      </p>{" "}
                      {/* FIXED */}
                      <p>
                        <strong>Date:</strong>{" "}
                        {new Date(selectedFeedback.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Ratings</h3>
                    <div className="space-y-2">
                      {[
                        {
                          label: "Tool Build Quality",
                          value: selectedFeedback.tool_build_quality,
                        },
                        {
                          label: "Packaging",
                          value: selectedFeedback.packaging,
                        },
                        {
                          label: "On-Time Delivery",
                          value: selectedFeedback.on_time_delivery,
                        },
                        {
                          label: "After Sales Support",
                          value: selectedFeedback.after_sales_support,
                        },
                        {
                          label: "Product Usability",
                          value: selectedFeedback.product_usability,
                        },
                        {
                          label: "Recommendation Likelihood",
                          value: selectedFeedback.recommendation_likelihood,
                        },
                      ].map((rating, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center"
                        >
                          <span className="text-sm">{rating.label}:</span>
                          <Badge
                            className={`${getRatingColor(
                              rating.value
                            )} text-white`}
                          >
                            {rating.value}/10
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Additional Suggestions</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm whitespace-pre-wrap">
                      {selectedFeedback.suggestions}
                    </p>
                  </div>
                </div>

                <div className="text-xs text-gray-500">
                  <p>
                    Submitted:{" "}
                    {new Date(selectedFeedback.created_at!).toLocaleString()}
                  </p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
