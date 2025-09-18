import { NextResponse } from "next/server";

export async function GET() {
  const student = {
    id: 1,
    name: "Ali Khan",
    age: 20,
    course: "Software Engineering",
  };

  return NextResponse.json(student);
}
