import { ReviewsTable } from "@/components/admin/reviews-table";

export default function ReviewsPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Reviews</h1>
        <p className="text-gray-600">Manage customer reviews and feedback</p>
      </div>
      <ReviewsTable />
    </div>
  );
}
