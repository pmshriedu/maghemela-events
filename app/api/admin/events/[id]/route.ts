import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const session = await getServerSession(authOptions);

    if (
      !session ||
      !(session as any).user ||
      (session as any).user.role !== "ADMIN"
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, image, description, time, date } = await request.json();

    if (!title || !description || !time || !date) {
      return NextResponse.json(
        { error: "Title, description, time, and date are required" },
        { status: 400 }
      );
    }

    const event = await prisma.event.update({
      where: { id: resolvedParams.id },
      data: {
        title,
        image,
        description,
        time,
        date: new Date(date),
        updatedAt: new Date(),
      },
    });

    // Revalidate home page and events page to show updated event
    revalidatePath("/");
    revalidatePath("/events");

    return NextResponse.json(event);
  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json(
      { error: "Failed to update event" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const session = await getServerSession(authOptions);

    if (
      !session ||
      !(session as any).user ||
      (session as any).user.role !== "ADMIN"
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.event.delete({
      where: { id: resolvedParams.id },
    });

    // Revalidate home page and events page to remove deleted event
    revalidatePath("/");
    revalidatePath("/events");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 }
    );
  }
}
