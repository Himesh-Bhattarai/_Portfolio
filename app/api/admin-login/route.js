import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import { generateToken } from "@/lib/jwt";

export async function POST(request) {
    try {
        const { Id, password } = await request.json();

        //validate the data

        if (!Id || !password) {
            return NextResponse.json({
                success: false,
                isAuthenticated: false,
                message: "Please provide all the required fields",
            }, {
                status: 400
            })
        }

        //check admin id is valid or not
        if (Id !== process.env.ADMIN_ID) {
            return NextResponse.json({
                success: false,
                isAuthenticated: false,
                message: "Invalid ID"
            }, {
                status: 400
            })

        }

        //compare password 
        const isPasswordMatch = await bcrypt.compare(password, process.env.ADMIN_PASSWORD)


        if (!isPasswordMatch) {
            return NextResponse.json({
                success: false,
                isAuthenticated: false,
                message: "Invalid username or password"
            }, {
                status: 400
            })
        }

        //generate token
        const payload = {
            sub: "Admin",
            username: "_himeshbhattarai",
            isAuthenticated: true,
            role: "admin",
            permissions: ["create", "read", "update", "delete"],
            sessionId: crypto.randomUUID(),
        };

        const accessToken = await generateToken(payload);

        if (!accessToken) {
            return NextResponse.json({
                success: false,
                isAuthenticated: false,
                message: "Failed to generate access token",
            }, {
                status: 500
            })
        }

        const cookieStore = await cookies();
        //set the access token in the cookie
        cookieStore.set("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 60 * 60
        })

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