import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import connectDB from "@/lib/connectDB";
import { validateToken } from "@/lib/jwt";
import Blog from "@/models/Blog";


// Get all blogs (Public)
export async function GET() {
    try {

        await connectDB();

        const blogs = await Blog.find();

        if (!blogs || blogs.length === 0) {
            return NextResponse.json({
                success: false,
                message: "No blogs found"
            }, {
                status: 404
            });
        }

        return NextResponse.json({
            success: true,
            message: "Blogs fetched successfully",
            blogs
        }, {
            status: 200
        });

    } catch (error) {

        return NextResponse.json({
            success: false,
            message: "Internal server error"
        }, {
            status: 500
        });

    }
}


// Create blog (Admin only)
export async function POST(request) {
    try {

        // Read request body
        const { title, description, image, body } = await request.json();


        // Validate required fields
        if (!title || !description || !image || !body) {

            return NextResponse.json({
                success: false,
                message: "Provide all the required fields"
            }, {
                status: 400
            });

        }


        // Validate data length
        if (
            title.length < 5 ||
            description.length < 10 ||
            body.length < 20
        ) {

            return NextResponse.json({
                success: false,
                message: "Please provide valid data"
            }, {
                status: 400
            });

        }


        // Check token from cookie
        const cookie = request.cookies.get("accessToken")?.value;


        if (!cookie) {

            return NextResponse.json({
                success: false,
                message: "Access token is required",
                isAuthenticated: false
            }, {
                status: 401
            });

        }


        // Validate token
        let decoded;

        try {

            decoded = validateToken(cookie);

        } catch (error) {

            return NextResponse.json({
                success: false,
                message: "Invalid or expired access token",
                isAuthenticated: false
            }, {
                status: 401
            });

        }


        // Check admin permission
        if (
            !decoded ||
            !decoded.isAuthenticated ||
            decoded.role !== "admin"
        ) {

            return NextResponse.json({
                success: false,
                message: "Unauthorized access",
                isAuthenticated: false
            }, {
                status: 403
            });

        }


        // Connect database
        await connectDB();


        // Create blog
        const newBlog = await Blog.create({
            title,
            description,
            image,
            body
        });


        if (!newBlog) {

            return NextResponse.json({
                success: false,
                message: "Failed to create blog"
            }, {
                status: 500
            });

        }


        return NextResponse.json({
            success: true,
            message: "Blog created successfully",
            blog: newBlog
        }, {
            status: 201
        });


    } catch (error) {

        return NextResponse.json({
            success: false,
            message: "Internal server error"
        }, {
            status: 500
        });

    }
}

//delete blog (admin only)
export async function DELETE(request){
    try{
        //Read request body
        const {id} = await request.json();

        //Validate id
        if(!id){
            return NextResponse.json({
                success: false,
                message: "Blog id is required"
            }, {
                status: 400
            });
        }

        //Check the token from cookie
        const cookie = request.cookies.get("accessToken")?.value;

        if(!cookie){
            return NextResponse.json({
                success: false,
                message: "Access token is required",
                isAuthenticated: false
            }, {
                status: 401
            });
        }

        //Validate token
        let decoded;

        try{
            decoded = validateToken(cookie);
        }catch(error){
            return NextResponse.json({
                success: false,
                message: "Invalid or expired access token",
                isAuthenticated: false
            }, {
                status: 401
            });
        }

        //Check admin permission
        if(
            !decoded ||
            !decoded.isAuthenticated ||
            decoded.role !== "admin"
        ){
            return NextResponse.json({
                success: false,
                message: "Unauthorized access",
                isAuthenticated: false
            }, {
                status: 403
            });
        }

        //Connect database
        await connectDB();

        //Delete blog
        const deletedBlog = await Blog.findByIdAndDelete(id);

        if(!deletedBlog){
            return NextResponse.json({
                success: false,
                message: "Failed to delete blog"
            }, {
                status: 404
            });
        }

        return NextResponse.json({
            success: true,
            message: "Blog deleted successfully",
            blog: deletedBlog
        }, {
            status: 200
        });

    }catch(error){
        return NextResponse.json({
            success: false,
            message: "Internal server error"
        }, {
            status: 500
        });
       
        
    }
}


//update blog

export async function PATCH(request){

    try{

        const {
            id,
            title,
            description,
            image,
            body
        } = await request.json();


        if(!id){
            return NextResponse.json({
                success:false,
                message:"Blog id is required"
            },{
                status:400
            });
        }


        const cookie = request.cookies.get("accessToken")?.value;


        if(!cookie){
            return NextResponse.json({
                success:false,
                message:"Access token required",
                isAuthenticated:false
            },{
                status:401
            });
        }


        let decoded;

        try{

            decoded = validateToken(cookie);

        }catch(error){

            return NextResponse.json({
                success:false,
                message:"Invalid or expired token",
                isAuthenticated:false
            },{
                status:401
            });

        }


        if(
            !decoded ||
            !decoded.isAuthenticated ||
            decoded.role !== "admin"
        ){

            return NextResponse.json({
                success:false,
                message:"Unauthorized access"
            },{
                status:403
            });

        }


        await connectDB();


        const existingBlog = await Blog.findById(id);


        if(!existingBlog){

            return NextResponse.json({
                success:false,
                message:"Blog not found"
            },{
                status:404
            });

        }


        const updateData = {
            ...(title && {title}),
            ...(description && {description}),
            ...(image && {image}),
            ...(body && {body})
        };


        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            {
                $set:updateData
            },
            {
                new:true
            }
        );


        return NextResponse.json({
            success:true,
            message:"Blog updated successfully",
            blog:updatedBlog
        },{
            status:200
        });


    }catch(error){

        if(error.name === "CastError"){

            return NextResponse.json({
                success:false,
                message:"Invalid blog id"
            },{
                status:400
            });

        }


        return NextResponse.json({
            success:false,
            message:"Internal server error"
        },{
            status:500
        });

    }
}