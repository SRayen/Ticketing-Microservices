# Ticketing Project

<div align="center">
  <code><img width="100" src="https://user-images.githubusercontent.com/25181517/183890598-19a0ac2d-e88a-4005-a8df-1ee36782fde1.png" alt="TypeScript" title="TypeScript"/></code>
  <code><img width="100" src="https://user-images.githubusercontent.com/25181517/183859966-a3462d8d-1bc7-4880-b353-e2cbed900ed6.png" alt="Express" title="Express"/></code>
	<code><img width="100" src="https://github.com/marwin1991/profile-technology-icons/assets/136815194/5f8c622c-c217-4649-b0a9-7e0ee24bd704" alt="Next.js" title="Next.js"/></code>
  <code><img width="100" src="https://user-images.githubusercontent.com/25181517/183898054-b3d693d4-dafb-4808-a509-bab54cf5de34.png" alt="Bootstrap" title="Bootstrap"/></code>
	<code><img width="100" src="https://user-images.githubusercontent.com/25181517/187955005-f4ca6f1a-e727-497b-b81b-93fb9726268e.png" alt="Jest" title="Jest"/></code>
	<code><img width="100" src="https://user-images.githubusercontent.com/25181517/182884894-d3fa6ee0-f2b4-4960-9961-64740f533f2a.png" alt="redis" title="redis"/></code>
	<code><img width="100" src="https://user-images.githubusercontent.com/25181517/182884177-d48a8579-2cd0-447a-b9a6-ffc7cb02560e.png" alt="mongoDB" title="mongoDB"/></code>
  <code><img width="100" src="https://user-images.githubusercontent.com/25181517/117207330-263ba280-adf4-11eb-9b97-0ac5b40bc3be.png" alt="Docker" title="Docker"/></code>
	<code><img width="100" src="https://user-images.githubusercontent.com/25181517/182534006-037f08b5-8e7b-4e5f-96b6-5d2a5558fa85.png" alt="Kubernetes" title="Kubernetes"/></code>
</div>

## Status

![tests-auth](https://github.com/sRayen/Ticketing-Microservices/workflows/tests-auth/badge.svg)
![tests-payments](https://github.com/sRayen/Ticketing-Microservices/workflows/tests-payments/badge.svg)

### 📑 Table of Contents
- [📘 Description](#description)
- [🚀 Environment Variables](#environment-varaibles)
- [🏗️ Architecture](#architecture)
- [🏗️ Development](#development)



## 📘 Description <a name="description"></a>


The Ticketing App Microservices Backend is a Node.js Typescript-based **Backend** (a very simple Next.js front-end is made just for demonstration and testing purposes) that leverages **microservices architecture** to provide a scalable and resilient user experience. It is composed of several microservices, each with a specific responsibility, including:

* ➡️ **Auth**: Handles authentication and authorization.
* ➡️ **Expiration**: Uses the Bull package to set expiration times for tickets and delay events by 15 minutes after order creation.
* ➡️ **Common**: A shared npm package that provides interfaces for events.
* ➡️ **Order**: Handles order creation and cancellation, and fires events to notify other services.
* ➡️ **Payment**: Handles payment processing using Stripe.
* ➡️ **Ticket**: Handles ticket creation and updates.
  
⭐ To facilitate communication between services, the Ticket App Microservices Backend uses **NATS Streaming Server**, a lightweight messaging service built on top of NATS.

🌟 The code is written in **Typescript**, which uses interfaces, classes, and generators to ensure a well-organized and maintainable codebase.

🌟 ☸ **Kubernetes** is used to create deployments for each service and its database, as well as to build ingress and set up the NATS Streaming service.

💥 The Ticketing App Microservices Backend is a reliable and efficient solution for ticket app needs. It leverages **Mongoose version numbers** to resolve **concurrency issues** between **services**.

## Environment Variables 🔑  <a name="environment-varaibles"></a>

 `JWT_KEY` : string, JSON web token secret <string> (Example: JwtKey)

`STRIPE_KEY`: your stripe API key to handle the payment 

_Note: All environment variables must be encoded in [base64 format](https://www.base64encode.org/)._

## Development	<a name="development"></a>

To manage all the Docker containers inside the Kubernetes cluster and simplify development workflow the project uses Skaffold.

To run the app in development environment, make sure Docker, Kubernetes and Skaffold are installed on your local machine.

Before running the app environment variables inside the Kubernetes cluster must be set. Execute commands below to set these environment variables:

```bash
# kubectl create secret generic stripe-secret --from-literal=STRIPE_KEY=<your_stripe_key>

# kubectl create secret generic jwt-secret --from-literal=JWT_KEY=<your_jwt_key>
```

Be sure to expose the ingress-nginx-controller with:

```bash
# kubectl expose deployment ingress-nginx-contoller --target-port=80 --type=NodePort -n kube-system
```

Start the app with `skaffold dev`.

🔍 [Skaffold ](https://skaffold.dev/) handles the workflow for **building**, **pushing** and **deploying** your application, allowing you to focus on what matters most: **writing code**.


##  Architecture 🏗️🔨 <a name="architecture"></a>

![architecture](https://github.com/SRayen/Ticketing-Microservices/assets/13922445/0e6c6799-ba1a-4e79-837c-c1b4d6ff3164)


