"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateTotal = exports.numberWithCommas = exports.validateData = exports.jobsites = exports.priceMap = exports.optionMap = exports.elevationMap = exports.modelMap = exports.ccMap = exports.jobsiteMap = void 0;
var data_json_1 = __importDefault(require("./data.json"));
exports.jobsiteMap = data_json_1.default.jobsiteMap;
exports.ccMap = data_json_1.default.ccMap;
exports.modelMap = data_json_1.default.modelMap;
exports.elevationMap = data_json_1.default.elevationMap;
exports.optionMap = data_json_1.default.optionMap;
exports.priceMap = data_json_1.default.priceMap;
exports.jobsites = data_json_1.default.jobsites.map(function (jobsite) {
    return __assign(__assign({}, jobsite), { name: exports.jobsiteMap[jobsite.id] });
});
exports.validateData = function () {
    exports.jobsites.forEach(function (jobsite) {
        if (!exports.jobsiteMap[jobsite.id]) {
            throw new Error("Invalid Id (Jobsite) - " + jobsite.id);
        }
        jobsite.model.forEach(function (id) {
            if (!exports.modelMap[id]) {
                throw new Error("Invalid Id (Model) - " + id);
            }
        });
        jobsite.elevation.forEach(function (id) {
            if (!exports.elevationMap[id]) {
                throw new Error("Invalid Id (Elevation) - " + id);
            }
        });
        jobsite.cc.forEach(function (id) {
            if (!exports.ccMap[id]) {
                throw new Error("Invalid Id (CC) - " + id);
            }
        });
        jobsite.option.forEach(function (id) {
            if (!exports.optionMap[id]) {
                throw new Error("Invalid Id (Option) - " + id);
            }
        });
    });
    Object.keys(exports.priceMap).forEach(function (key) {
        var pipeCount = key.split('|').length - 1;
        if (pipeCount !== 4) {
            throw new Error("Invalid Price Key (Incorrect Pipe Count) - " + key);
        }
        key.split('|').forEach(function (k, i) {
            if (i === 0 && !Object.keys(exports.jobsiteMap).includes(k)) {
                throw new Error("Invalid Price Key (Jobsite) - " + key);
            }
            if (k !== '*') {
                if (i === 1 && !Object.keys(exports.ccMap).includes(k)) {
                    throw new Error("Invalid Price Key (CC) - " + key);
                }
                if (i === 2 && !Object.keys(exports.modelMap).includes(k)) {
                    throw new Error("Invalid Price Key (Model) - " + key);
                }
                if (i === 3 && !Object.keys(exports.elevationMap).includes(k)) {
                    throw new Error("Invalid Price Key (Elevation) - " + key);
                }
            }
            if (i === 4 && !Object.keys(exports.optionMap).includes(k)) {
                throw new Error("Invalid Price Key (Option) - " + key);
            }
        });
    });
};
exports.numberWithCommas = function (int) {
    return int.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
exports.calculateTotal = function (invoiceItems) {
    var newTotal = 0;
    invoiceItems.forEach(function (item) {
        var parsedPrice = parseInt(item.price);
        if (!isNaN(parsedPrice)) {
            newTotal += parsedPrice;
        }
    });
    return { invoiceItems: invoiceItems, total: "" + newTotal, totalFormatted: "$" + exports.numberWithCommas(newTotal) };
};
