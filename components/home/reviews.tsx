"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Star,
  Quote,
  User,
  Phone,
  Mail,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import useEmblaCarousel from "embla-carousel-react";
import {
  SuccessDialog,
  SuccessDialogContent,
  SuccessDialogHeader,
  SuccessDialogTitle,
  SuccessDialogDescription,
} from "@/components/ui/success-dialog";

interface Review {
  id: string;
  name?: string;
  star: number;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}

export function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: true,
    breakpoints: {
      "(min-width: 768px)": { slidesToScroll: 2 },
      "(min-width: 1024px)": { slidesToScroll: 3 },
    },
  });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    star: 5,
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    if (emblaApi) {
      const onSelect = () => {
        setPrevBtnDisabled(!emblaApi.canScrollPrev());
        setNextBtnDisabled(!emblaApi.canScrollNext());
      };

      emblaApi.on("select", onSelect);
      onSelect(); // Initial state

      return () => {
        emblaApi.off("select", onSelect);
      };
    }
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const fetchReviews = async () => {
    try {
      const response = await fetch("/api/reviews");
      if (response.ok) {
        const data = await response.json();
        setReviews(data.slice(0, 12)); // Show more reviews for carousel
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowSuccessDialog(true);
        setFormData({ name: "", star: 5, email: "", phone: "", message: "" });
        setShowForm(false);
        fetchReviews();
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to submit review");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const renderInteractiveStars = (
    currentRating: number,
    onRatingChange: (rating: number) => void
  ) => {
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 cursor-pointer transition-colors ${
              i < currentRating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300 hover:text-yellow-300"
            }`}
            onClick={() => onRatingChange(i + 1)}
          />
        ))}
        <span className="ml-2 text-sm">{currentRating}/5</span>
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="py-16 bg-linear-to-br from-amber-50 via-orange-25 to-yellow-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <div className="flex items-center justify-center w-16 h-16 bg-linear-to-br from-amber-500 to-orange-600 rounded-full mx-auto mb-4">
              <Quote className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Testimonials
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Hear from our valued visitors who experienced the magic of Maghey
            Sankranti Mela
          </p>
        </div>

        {/* Testimonials Grid */}
        {reviews.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
              <Quote className="h-20 w-20 text-amber-400 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                No Reviews Yet
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Be the first to share your experience at the Maghey Sankranti
                Mela!
              </p>
            </div>
          </div>
        ) : (
          <div className="relative">
            {/* Carousel Navigation */}
            {reviews.length > 3 && (
              <div className="flex justify-center gap-4 mb-8">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={scrollPrev}
                  disabled={prevBtnDisabled}
                  className="rounded-full shadow-lg hover:shadow-xl transition-shadow"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={scrollNext}
                  disabled={nextBtnDisabled}
                  className="rounded-full shadow-lg hover:shadow-xl transition-shadow"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}

            {/* Carousel Container */}
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-6">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="flex-none w-full md:w-1/2 lg:w-1/3"
                  >
                    <Card className="bg-white border-2 border-amber-100 hover:border-amber-200 hover:shadow-xl transition-all duration-300 group h-full">
                      <CardContent className="p-8">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="flex items-center justify-center w-10 h-10 bg-linear-to-br from-amber-500 to-orange-600 rounded-full">
                                <User className="h-5 w-5 text-white" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900">
                                  {review.name || "Anonymous"}
                                </h4>
                                <p className="text-xs text-gray-500">
                                  {formatDate(review.createdAt)}
                                </p>
                              </div>
                            </div>
                          </div>
                          {renderStars(review.star)}
                        </div>

                        <Quote className="h-8 w-8 text-amber-300 mb-4" />

                        <blockquote className="text-gray-700 leading-relaxed mb-6 line-clamp-4">
                          "{review.message}"
                        </blockquote>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Add Review Button */}
        <div className="text-center mt-12">
          {!showForm && (
            <Button
              onClick={() => setShowForm(true)}
              className="bg-linear-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Share Your Experience
            </Button>
          )}
        </div>

        {/* Review Form */}
        {showForm && (
          <Card className="max-w-2xl mx-auto mt-8">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Share Your Experience
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Your Rating</Label>
                  <div className="mt-2">
                    {renderInteractiveStars(formData.star, (rating) =>
                      setFormData({ ...formData, star: rating })
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="name">
                    Your Name <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative mt-1">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      placeholder="Your full name"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative mt-1">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                        placeholder="your@email.com"
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone">
                      Phone <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative mt-1">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        required
                        placeholder="+91 XXXXX XXXXX"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">
                    Your Testimonial <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    rows={4}
                    placeholder="Share your experience with us..."
                    className="mt-1"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-amber-600 hover:bg-amber-700"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Review"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Success Dialog */}
        <SuccessDialog
          open={showSuccessDialog}
          onOpenChange={setShowSuccessDialog}
        >
          <SuccessDialogContent className="max-w-md">
            <SuccessDialogHeader>
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <SuccessDialogTitle className="text-xl font-bold text-gray-900 mb-2">
                  Thank You for Your Review!
                </SuccessDialogTitle>
                <SuccessDialogDescription className="text-gray-600 text-center">
                  Your testimonial has been submitted successfully. We will
                  review it and showcase your experience soon. Your feedback
                  helps us make the Maghey Sankranti Mela even better!
                </SuccessDialogDescription>
              </div>
            </SuccessDialogHeader>
          </SuccessDialogContent>
        </SuccessDialog>
      </div>
    </div>
  );
}
