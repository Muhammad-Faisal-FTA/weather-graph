import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import {dbConnector} from "@/lib/db";
import {hash} from "bcryptjs"
const print = console.log;


export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json();
        const { name, email, password, city, neighbourCities } = body;

        // Basic validation
        if (!name || !email ||!password || !city || !neighbourCities) {
            return NextResponse.json({
                message: `All fields are required: ${name} ${email} ${password} ${city} ${neighbourCities}`,
                Error: `${!name ? "Name" : ""} ${!email ? "Email" : ""} ${!password ? "Password" : ""} is missing ${!city ? "City" : ""} ${!neighbourCities ? "Neighbour Cities" : ""}`
            }, 
            {
                status: 409 //conflict
            })
        }
        if (password.length < 4) {
            return NextResponse.json({
                message: `Password must be at least 4 characters long`
            },{status: 400}) // bad request
        }

        await dbConnector();
        
        const existingUser = await User.findOne({ $and: [{ email }, { name }] });
        if (existingUser) {
            return NextResponse.json({
                message: `User with email ${email} and name ${name} already exists`
            })
            , { status: 409 } // conflict
        }
            // Hash the password before saving to the database


        const hashedPassword = await hash(password, 12);
        const user = await User.create({
            name,
            email, 
            password: hashedPassword, 
            city, 
            neighbourCities
         });
         
        print("New User Created:", user);
        print("User registered successfully!")
        return NextResponse.json({ 
            message: "User registered successfully!" ,
        },{
            status: 201
        });
    } catch (error) {
        return NextResponse.json({ message: `Internal Server Error ${error}` }, { status: 500 });
    }
}