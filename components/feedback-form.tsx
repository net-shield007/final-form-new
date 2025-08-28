"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Send, CheckCircle } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RatingSlider } from "@/components/ui/rating-slider";
import { feedbackSchema, FeedbackFormData } from "@/lib/validations";
import { apiClient } from "@/lib/api";
import { cn } from "@/lib/utils";

const steps = [
  {
    title: "Contact Information",
    fields: [
      "email",
      "date",
      "emailId",
      "contactName",
      "companyName",
      "country",
    ],
  },
  {
    title: "Product Ratings",
    fields: ["toolBuildQuality", "packaging", "onTimeDelivery"],
  },
  {
    title: "Service Ratings",
    fields: [
      "afterSalesSupport",
      "productUsability",
      "recommendationLikelihood",
    ],
  },
  { title: "Additional Feedback", fields: ["suggestions"] },
];

const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Germany",
  "France",
  "Australia",
  "India",
  "China",
  "Japan",
  "Brazil",
  "Mexico",
  "South Africa",
  "Other",
];

export default function FeedbackForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    trigger,
  } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      email: "ishaan.shrivastava@tritorc.com",
      date: new Date().toISOString().split("T")[0],
      toolBuildQuality: 5,
      packaging: 5,
      onTimeDelivery: 5,
      afterSalesSupport: 5,
      productUsability: 5,
      recommendationLikelihood: 5,
    },
  });

  const watchedValues = watch();
  const progress = ((currentStep + 1) / steps.length) * 100;

  const nextStep = async () => {
    const currentFields = steps[currentStep].fields;
    const isValid = await trigger(currentFields as any);

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const onSubmit = async (data: FeedbackFormData) => {
    setIsSubmitting(true);

    try {
      const result = await apiClient.submitFeedback(data);

      if (result.success) {
        setIsSubmitted(true);
        toast.success(result.message || "Feedback submitted successfully!");
      } else {
        toast.error(result.error || "Failed to submit feedback");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Network error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-screen flex items-center justify-center p-4"
      >
        <Card className="w-full max-w-md">
          <CardContent className="pt-8 text-center space-y-4">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
            <h2 className="text-2xl font-bold text-gray-900">Thank You!</h2>
            <p className="text-gray-600">
              Your feedback has been submitted successfully. We appreciate your
              time and input.
            </p>
            <Button
              onClick={() => {
                setIsSubmitted(false);
                setCurrentStep(0);
              }}
              className="w-full"
            >
              Submit Another Response
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <Toaster position="top-right" />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Tritorc Product Feedback
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Welcome to the Tritorc Family! It is great having you be a part of
            our burgeoning group as a valued customer. We would love to hear
            from you about what you think of our products and after-sales
            services.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>
              Step {currentStep + 1} of {steps.length}
            </span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Form */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl text-center">
              {steps[currentStep].title}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Step 0: Contact Information */}
                  {currentStep === 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">Primary Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          {...register("email")}
                          className={cn(errors.email && "border-red-500")}
                        />
                        {errors.email && (
                          <p className="text-sm text-red-500">
                            {errors.email.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="date">Date *</Label>
                        <Input
                          id="date"
                          type="date"
                          {...register("date")}
                          className={cn(errors.date && "border-red-500")}
                        />
                        {errors.date && (
                          <p className="text-sm text-red-500">
                            {errors.date.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="emailId">Secondary Email *</Label>
                        <Input
                          id="emailId"
                          type="email"
                          {...register("emailId")}
                          className={cn(errors.emailId && "border-red-500")}
                        />
                        {errors.emailId && (
                          <p className="text-sm text-red-500">
                            {errors.emailId.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="contactName">Contact Name *</Label>
                        <Input
                          id="contactName"
                          {...register("contactName")}
                          className={cn(errors.contactName && "border-red-500")}
                        />
                        {errors.contactName && (
                          <p className="text-sm text-red-500">
                            {errors.contactName.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="companyName">Company Name *</Label>
                        <Input
                          id="companyName"
                          {...register("companyName")}
                          className={cn(errors.companyName && "border-red-500")}
                        />
                        {errors.companyName && (
                          <p className="text-sm text-red-500">
                            {errors.companyName.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="country">Country *</Label>
                        <select
                          id="country"
                          {...register("country")}
                          className={cn(
                            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                            errors.country && "border-red-500"
                          )}
                        >
                          <option value="">Select Country</option>
                          {countries.map((country) => (
                            <option key={country} value={country}>
                              {country}
                            </option>
                          ))}
                        </select>
                        {errors.country && (
                          <p className="text-sm text-red-500">
                            {errors.country.message}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Step 1: Product Ratings */}
                  {currentStep === 1 && (
                    <div className="space-y-8">
                      <RatingSlider
                        label="Tool Build Quality *"
                        value={watchedValues.toolBuildQuality}
                        onChange={(value) =>
                          setValue("toolBuildQuality", value)
                        }
                      />

                      <RatingSlider
                        label="Packaging *"
                        value={watchedValues.packaging}
                        onChange={(value) => setValue("packaging", value)}
                      />

                      <RatingSlider
                        label="On-Time Delivery *"
                        value={watchedValues.onTimeDelivery}
                        onChange={(value) => setValue("onTimeDelivery", value)}
                      />
                    </div>
                  )}

                  {/* Step 2: Service Ratings */}
                  {currentStep === 2 && (
                    <div className="space-y-8">
                      <RatingSlider
                        label="After Sales Support *"
                        value={watchedValues.afterSalesSupport}
                        onChange={(value) =>
                          setValue("afterSalesSupport", value)
                        }
                      />

                      <RatingSlider
                        label="Product Usability *"
                        value={watchedValues.productUsability}
                        onChange={(value) =>
                          setValue("productUsability", value)
                        }
                      />

                      <RatingSlider
                        label="Recommendation Likelihood *"
                        lowLabel="Unlikely"
                        highLabel="Very Likely"
                        value={watchedValues.recommendationLikelihood}
                        onChange={(value) =>
                          setValue("recommendationLikelihood", value)
                        }
                      />
                    </div>
                  )}

                  {/* Step 3: Additional Feedback */}
                  {currentStep === 3 && (
                    <div className="space-y-4">
                      <Label htmlFor="suggestions">
                        Additional Suggestions & Comments *
                      </Label>
                      <Textarea
                        id="suggestions"
                        rows={8}
                        placeholder="Please share any additional feedback, suggestions, or comments about our products and services..."
                        {...register("suggestions")}
                        className={cn(errors.suggestions && "border-red-500")}
                      />
                      {errors.suggestions && (
                        <p className="text-sm text-red-500">
                          {errors.suggestions.message}
                        </p>
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>

                {currentStep < steps.length - 1 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center gap-2"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Submit Feedback
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
