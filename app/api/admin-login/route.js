import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdmin } from "@/lib/verifyAdmin";

export async function POST(request) {
    try {
        const { Id, password } = await request.json();

        const result = await verifyAdmin({ id: Id, password });

        if (!result.isAuthenticated) {
            return NextResponse.json(result, { status: 400 });
        }

        const cookieStore = await cookies();
        cookieStore.set("accessToken", result.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 60 * 60
        });

        return NextResponse.json({
            success: true,
            isAuthenticated: true,
            message: "Admin logged in successfully",
        }, {
            status: 200
        })

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Internal server error"
        }, {
            status: 500

        })


    }
}