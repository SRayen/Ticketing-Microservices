# Ticketing Project

## Status

![tests-auth](https://github.com/sRayen/Ticketing-Microservices/workflows/tests-auth/badge.svg)
![tests-payments](https://github.com/sRayen/Ticketing-Microservices/workflows/tests-payments/badge.svg)

## Description

The Ticketing App Microservices Backend is a Node.js Typescript-based **backend** (a very simple Next.js front-end is made just for demonstration and testing purposes) that leverages **microservices architecture** to provide a scalable and resilient user experience. It is composed of several microservices, each with a specific responsibility, including:

* **Auth**: Handles authentication and authorization.
* **Expiration**: Uses the Bull package to set expiration times for tickets and delay events by 15 minutes after order creation.
* **Common**: A shared npm package that provides interfaces for events.
* **Order**: Handles order creation and cancellation, and fires events to notify other services.
* **Payment**: Handles payment processing using Stripe.
* **Ticket**: Handles ticket creation and updates.
  
To facilitate communication between services, the Ticket App Microservices Backend uses **NATS Streaming Server**, a lightweight messaging service built on top of NATS.

The code is written in **Typescript**, which uses interfaces, classes, and generators to ensure a well-organized and maintainable codebase.
**Kubernetes** is used to create deployments for each service and its database, as well as to build ingress and set up the NATS Streaming service.

The Ticketing App Microservices Backend is a reliable and efficient solution for ticket app needs. It leverages **Mongoose version numbers** to resolve **concurrency issues** between services.

