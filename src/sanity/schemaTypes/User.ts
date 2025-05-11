import { defineField, defineType } from "sanity";


export default defineType({
    name: "user",
    type: "document",
    title: "User",
    fields: [
        defineField({
            name: "firstName",
            type: "string",
            title: "FirstName"
        }),
        defineField({
            name: "lastName",
            type: "string",
            title: "LirstName"
        }),
        defineField({
            name: "email",
            type: "string",
            title: "Email"
        }),
        defineField({
            name: "password",
            type: "string",
            title: "Password"
        }),
        defineField({
            name: "role",
            type: "string",
            title: "Role",
        }),
    ],
})