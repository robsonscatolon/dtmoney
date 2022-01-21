import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createServer, Model } from "miragejs";

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) { 
    server.db.loadData(
      {
        transactions: [
          {
            id: 1,
            title: 'Freelance Website',
            category: 'Work',
            amount: 8000,
            type: 'deposit',
            createdAt: new Date('2022-01-21 07:30:00')
          },
          {
            id: 2,
            title: `Helena's clothes batism`,
            category: 'Shop',
            amount: 500,
            type: 'withdraw',
            createdAt: new Date('2022-01-22 09:30:00')
          },
        ]
      }
    );

  },

  routes() {
    this.namespace = "api";
    this.get("/transactions", () => {
      return this.schema.all('transaction');
    });

    this.post("/transactions", (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create("transaction", data);
    });
  },
});
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
