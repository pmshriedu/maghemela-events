import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const blog = await prisma.blog.create({
      data: {
        id: body.id || crypto.randomUUID(),
        title: body.title,
        slug: body.slug,
        content: body.content,
        coverImage: body.coverImage || null,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 }
    );
  }
}
