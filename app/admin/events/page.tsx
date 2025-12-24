import { EventsTable } from "@/components/admin/events-table";

export default function EventsPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Events</h1>
        <p className="text-gray-600">
          Manage your cultural events and programs
        </p>
      </div>
      <EventsTable />
    </div>
  );
}
