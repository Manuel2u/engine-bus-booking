import { PopulateOptions, SortOrder } from "mongoose";
import {
  GenerateQueryInputProps,
  GenerateQueryOutputProps,
  OperationInputProps,
  OperationOutputProps,
  SearchOperatorOption,
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
      } else if (key === "contains" || key === "notContains") {
        if (typeof value === "string") {
          result[operatorKey] = { $regex: `.*${value}.*` };
        }
      } else if (key === "regex") {
        if (typeof value === "string") {
          result[operatorKey] = { $regex: value, $options: "i" }; // Add the case-insensitive option
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
  const filter: GenerateQueryOutputProps["filter"] = {};
  const sort: GenerateQueryOutputProps["sort"] = {};
  const populate: GenerateQueryOutputProps["populate"] = [];
  let skip = 0;
  let limit = 0;

  // Build the filter part
  for (const field in queryProps.filter) {
    const value = queryProps.filter[field];
    if (!filter.$and) {
      filter.$and = [];
    }
    filter.$and.push({ [field]: buildOperation(value) });
  }

  // Build the search part
  if (queryProps.search) {
    const searchFilters = queryProps.search.fields.map((field) => {
      return {
        [field]: {
          $regex: queryProps.search.query,
          $options: queryProps.search.options.join(""), // Combine options if there are multiple
        },
      };
    });
    if (!filter.$and) {
      filter.$and = [];
    }
    filter.$and.push({
      $or: searchFilters,
    });
  }

  // Example sort building
  for (const key in queryProps.sort) {
    sort[key] = queryProps.sort[key];
  }

  // Example populate building
  if (queryProps.populate) {
    populate.push(
      ...queryProps.populate.map((field) =>
        buildPopulationOptions(field, skip, limit)
      )
    );
  }

  // Example skip and limit assignment
  skip = queryProps.pagination?.skip || 0;
  limit = queryProps.pagination?.limit || 0;

  return {
    filter,
    sort,
    populate,
    skip,
    limit,
  };
}

// // Example usage:
// const queryProps = {
//   filter: {
//     email: { eq: "emmanueldodoo94@gmail.com" },
//   },
//   pagination: { skip: 0, limit: 10 },
//   populate: ["Tickets", "Bookings.Trip", "Bookings.Bus"],
//   sort: { email: "asc" as const },
//   search: {
//     query: "emma",
//     fields: ["fullName", "programme", "email"],
//     options: [SearchOperatorOption.CaseInsensitive],
//   },
// };

// const generatedQuery = __generateQuery("User", queryProps);

// console.log("Generated Query:", JSON.stringify(generatedQuery, null, 2));
