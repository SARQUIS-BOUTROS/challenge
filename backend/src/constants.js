'use strict';

const URL_ROOT = "http://localhost:3001";

const STATUS_ORDER_REQUEST = {
    ONGOING : "ONGOING",
    READY: "READY",
    REJECTED: "REJECTED"
};
const PORT = 3001;

const DB_NAME = "orderrequest";

module.exports = {
    URL_ROOT,
    STATUS_ORDER_REQUEST,
    PORT,
    DB_NAME
}