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

<img src="https://camo.githubusercontent.com/628ca9bc2b443eead4b2225a02fb0b3b8e3202fcc1a9351f265f91460e8c23ef/68747470733a2f2f6e6174732e696f2f696d672f6c6f676f2e706e67" alt="Logo" data-canonical-src="https://nats.io/img/logo.png" style="max-width: 100%;">
</div>

## Status

![tests-auth](https://github.com/sRayen/Ticketing-Microservices/workflows/tests-auth/badge.svg)
![tests-payments](https://github.com/sRayen/Ticketing-Microservices/workflows/tests-payments/badge.svg)

### 📑 Table of Contents
- [📘 Description](#description)
- [🚀 Environment Variables](#environment-varaibles)
- [🏗️ Architecture](#architecture)
- [⏹️ Development](#development)
- [🎬 Screenshots](#screenshots)



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

👉 Start the app with `skaffold dev`.

🔍 [Skaffold ](https://skaffold.dev/) handles the workflow for **building**, **pushing** and **deploying** your application, allowing you to focus on what matters most: **writing code**.


##  Architecture 🏗️🔨 <a name="architecture"></a>

![architecture](https://github.com/SRayen/Ticketing-Microservices/assets/13922445/702adccc-3fb4-4410-acd1-957d639ef7f4)

##  Screenshots 🏗️🔨 <a name="screenshots"></a>

### <ins>Deployments</ins>:
![deployments](https://github.com/SRayen/Ticketing-Microservices/assets/13922445/f33b775c-3b53-422b-9ac6-5864e56cfecf)

### <ins>SignUp</ins>:
![SignUp](https://github.com/SRayen/Ticketing-Microservices/assets/13922445/1c72ddf3-4a4d-4c70-b497-60df1e07afb3)

### <ins>Tickets</ins>:
![Tickets](https://github.com/SRayen/Ticketing-Microservices/assets/13922445/2cf0b929-4ada-4347-b84d-8e6270cbec09)

### <ins>Purchase Ticket</ins>:
![Purchase Ticket](https://github.com/SRayen/Ticketing-Microservices/assets/13922445/eead1db3-1dfc-462f-bf5e-7183c04fb488)

### <ins>Orders</ins>:
![orders](https://github.com/SRayen/Ticketing-Microservices/assets/13922445/3254127d-74c2-4370-a2bc-08329d603d63)

### <ins>Microservices logs</ins>:
![logs](https://github.com/SRayen/Ticketing-Microservices/assets/13922445/a07a816a-f441-4e2a-9ce9-6e79743416e3)

### <ins>Stripe Payments</ins>:
![stripe_payments](https://github.com/SRayen/Ticketing-Microservices/assets/13922445/b71f7729-3b95-44f8-a745-cdf7d2f01e3b)

## Dedication

* 📌 I would like to express my deepest gratitude to [Stephen Grider](https://www.linkedin.com/in/stephengrider/) , the creator of the **"Microservices with Node JS and React"** course on Udemy. It is thanks to Stephen's exceptional expertise and unwavering guidance that this project came to fruition and under his tutelage.
* 📌 This project is a testament to my growth as a developer and the invaluable lessons I have learned on this incredible learning journey.
* 📌 I am thrilled to share this project with you, and I hope it serves as a tribute to Stephen Grider's incredible teaching and mentorship.




