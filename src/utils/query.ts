import { PopulateOptions, SortOrder } from "mongoose";
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

function buildPopulationOptions(
  path: string,
  skip: number,
  limit: number
): PopulateOptions {
  const nestedPaths = path.split(".");
  let nestedPopulateOption: PopulateOptions | undefined = undefined;

  for (const nestedPath of nestedPaths.reverse()) {
    const currentNestedOption: PopulateOptions = {
      path: nestedPath,
      options: { skip, limit },
    };

    if (nestedPopulateOption) {
      currentNestedOption.populate = nestedPopulateOption;
    }
    nestedPopulateOption = currentNestedOption;
  }

  return nestedPopulateOption!;
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

  const sort: { [key: string]: SortOrder | { $meta: any } } =
    queryProps.sort || {};
  const skip: number = queryProps.pagination?.skip || 0;
  const limit: number = queryProps.pagination?.limit || 0;
  const populate: PopulateOptions[] =
    queryProps.populate?.map((field) =>
      buildPopulationOptions(field, skip, limit)
    ) || [];

  return {
    filter,
    sort,
    populate,
    skip,
    limit,
  };
}

// // ...

// // ...

// const queryProps = {
//   filter: {
//     email: { eq: "emmanueldodoo94@gmail.com" },
//   },
//   pagination: { skip: 0, limit: 10 },
//   populate: ["Tickets", "Bookings.Trip", "Bookings.Bus"],
//   sort: { email: "asc" as const },
// };

// const generatedQuery = __generateQuery("User", queryProps);

// console.log("Generated Query:", JSON.stringify(generatedQuery, null, 2));
