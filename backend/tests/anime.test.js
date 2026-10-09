// Import testing functions directly from Vitest
import { describe, test, expect, vi, beforeEach } from "vitest";

// Import Supertest to send HTTP requests
import request from "supertest";

// Import the function that creates our Express application
import { createApp } from "../app.js";

// Group all tests related to the Anime API
describe("Anime API", () => {

    // Variables shared by the tests
    let app;
    let Anim;

    // Run this setup before each test
    beforeEach(() => {

        // Create a fake Anime model constructor
        Anim = vi.fn(function (data) {

            // Copy the supplied data onto the new object
            Object.assign(this, data);

            // Fake the save() method
            this.save = vi.fn().mockResolvedValue(undefined);
        });

        // Fake the static find() method
        Anim.find = vi.fn();

        // Create the app using the fake model
        app = createApp(Anim);
    });

    // Test 1: Homepage
    test("GET / returns Hello World!", async () => {
        const res = await request(app).get("/");

        expect(res.status).toBe(200);
        expect(res.text).toBe("Hello World!");
    });

    // Test 2: Retrieve anime records
    test("GET /api/anime returns anime records", async () => {
        const records = [
            {
                title: "Naruto",
                link: "https://example.com"
            }
        ];

        // Set the fake database query result
        Anim.find.mockResolvedValue(records);

        const res = await request(app).get("/api/anime");

        expect(res.status).toBe(200);
        expect(res.body).toEqual(records);
    });

    // Test 3: Create an anime record
    test("POST /api/anime saves a record", async () => {
        const input = {
            title: "Naruto",
            link: "https://example.com",
            description: "A ninja story"
        };

        const res = await request(app)
            .post("/api/anime")
            .send(input);

        expect(res.status).toBe(201);
        expect(res.body.title).toBe("Naruto");
        expect(Anim).toHaveBeenCalledWith(input);

        // Check that save() was called on the created instance
        expect(Anim.mock.results[0].value.save).toHaveBeenCalled();
    });
});