import { type NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";
const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      companyName,
      contact,
      contactNumber,
      email,
      natureOfBusiness,
      sizeOfManpower,
      additionalNotes,
    } = body;

    // Validate required fields
    if (
      !companyName ||
      !contact ||
      !contactNumber ||
      !email ||
      !natureOfBusiness ||
      !sizeOfManpower
    ) {
      return NextResponse.json(
        { error: "All required fields must be filled" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    // Create demo request
    const demoRequest = await prisma.demoRequest.create({
      data: {
        companyName,
        contact,
        contactNumber,
        email,
        natureOfBusiness,
        sizeOfManpower,
        additionalNotes: additionalNotes || null,
      },
    });

    return NextResponse.json(
      { message: "Demo request submitted successfully", id: demoRequest.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating demo request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const demoRequests = await prisma.demoRequest.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(demoRequests);
  } catch (error) {
    console.error("Error fetching demo requests:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
