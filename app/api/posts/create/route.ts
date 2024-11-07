import { db } from '@/db';
import { posts } from '@/db/schema';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const createdPost = await db.insert(posts).values(body).returning();
    return NextResponse.json({ status: 200, data: createdPost });
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
