import { PopulateOptions } from "mongoose";
import {
  GenerateQueryInputProps,
  GenerateQueryOutputProps,
  OperationInputProps,
  OperationOutputProps,
  ValueTypes,
} from "./query.types";

type OperationMap = {
  eq?: "$eq";
  notEq?: "$ne";
  notIn?: "$nin";
  contains?: "$regex";
  notContains?: "$not";
  regex?: "$regex";
};

function buildOperation(operation: OperationInputProps): OperationOutputProps {
  const operationMap: OperationMap = {
    eq: "$eq",
    notEq: "$ne",
    notIn: "$nin",
    contains: "$regex",
    notContains: "$not",
    regex: "$regex",
  };

  const result: { [key: string]: any } = {};

  for (const key in operation) {
    const operatorKey = operationMap[key as keyof OperationInputProps];
    if (operatorKey) {
      const value = operation[key as keyof OperationInputProps];
      if (key === "notIn") {
        result[operatorKey] = { $nin: value as ValueTypes[keyof ValueTypes][] };
      } else if (
        key === "contains" ||
        key === "notContains" ||
        key === "regex"
      ) {
        if (typeof value === "string") {
          result[operatorKey] = {
            $regex: `.*${value}.*`,
            $options: "i",
          };
        }
      } else {
        result[operatorKey] = value;
      }
    }
  }

  return result as OperationOutputProps;
}

export function __generateQuery(
  modelName: string,
  queryProps: GenerateQueryInputProps
): GenerateQueryOutputProps {
  const filter: Record<
    string,
    OperationOutputProps | { $or: OperationOutputProps[] }
  > = {};
  for (const field in queryProps.filter) {
    filter[field] = buildOperation(queryProps.filter[field]);
  }

  const sort: object = queryProps.sort || {};
  const skip: number = queryProps.pagination?.skip || 0;
  const limit: number = queryProps.pagination?.limit || 0;
  const populate: PopulateOptions[] =
    queryProps.populate?.map((field) => ({ path: field })) || [];

  return {
    filter,
    sort,
    populate,
    skip,
    limit,
  };
}

export default {
  __generateQuery,
};
