import request from "supertest"; //supertest : Allow us to fake a req to Express App
import { app } from "../../app";

it("has a route handler listening to /api/tickets for post requests", async () => {});

it("can only be accessed if the user is signed in", async () => {});

it("returns an error if an invalid title is provided", async () => {});

it("returns an error if an invalid price is provided", async () => {});

it("creates a ticket with valid inputs", async () => {});