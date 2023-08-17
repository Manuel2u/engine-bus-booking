import { PopulateOptions } from "mongoose";

import { ObjectId } from "mongoose";

export interface ValueTypes {
  string: string;
  number: number;
  boolean: boolean;
  Date: Date;
  ObjectId: ObjectId;
}

export interface OperationInputProps {
  eq?: ValueTypes[keyof ValueTypes];
  notIn?: ValueTypes[keyof ValueTypes][];
  notEq?: ValueTypes[keyof ValueTypes];
  notContains?: string;
  contains?: string;
  regex?: string;
}

export type OperationOutputProps =
  | ValueTypes[keyof ValueTypes]
  | { $regex: string; $options: string }
  | { $or: OperationOutputProps[] };

export interface GenerateQueryInputProps {
  sort?: object;
  pagination?: {
    skip: number;
    limit: number;
  };
  populate?: string[];
  filter?: Record<string, OperationInputProps>;
  search?: {
    query: string;
    fields: string[];
    options: string[];
  };
  extraFilter?: Record<string, OperationInputProps>;
}

export interface GenerateQueryOutputProps {
  filter: Record<
    string,
    OperationOutputProps | { $or: OperationOutputProps[] }
  >;
  sort: object;
  populate: PopulateOptions[] | PopulateOptions;
  skip: number;
  limit: number;
}
