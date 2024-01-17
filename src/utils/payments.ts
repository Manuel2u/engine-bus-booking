"use strict";

import { config } from "../config";

import axios from "axios";
const net = axios.create({
  baseURL: "https://api.paystack.co/transaction/",
  timeout: config.payment.timeout,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${config.payment.secret_key}`,
  },
});

async function __initializePayment({
  amount,
  email,
  reference,
  metadata = {},
}) {
  return new Promise(async function (resolve, reject) {
    await net
      .post("/initialize", {
        amount: String(amount),
        email: email,
        reference: reference,
        metadata: metadata,
        currency: "GHS",
        channels: ["card", "mobile_money"],
        callback_url: config.payment.callback_url,
      })
      .then(function ({ data }) {
        resolve(data);
      })
      .catch(reject);
  });
}

async function __verifyPayment({ reference }) {
  return new Promise(async function (resolve, reject) {
    await net
      .get(`/verify/${reference}`)
      .then(function ({ data }) {
        resolve(data);
      })
      .catch(reject);
  });
}

export { __initializePayment, __verifyPayment };
