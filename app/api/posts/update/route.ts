import { db } from '@/db';
import { posts } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const updatedPost = await db
      .update(posts)
      .set(body)
      .where(eq(posts.id, body.id))
      .returning();
    return NextResponse.json({ status: 200, data: updatedPost });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error?.message,
      },
      {
        status: 500,
      }
    );
  }
}
