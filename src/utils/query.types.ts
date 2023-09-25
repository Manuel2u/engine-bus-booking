import { PopulateOptions, SortOrder, Types } from "mongoose";

import { ObjectId } from "mongoose";

export interface ValueTypes {
  string: string;
  number: number;
  boolean: boolean;
  Date: Date;
  ObjectId: Types.ObjectId;
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
  sort?: { [key: string]: SortOrder | { $meta: any } };
  pagination?: {
    skip: number;
    limit: number;
  };
  populate?: string[];
  filter?: Record<string, OperationInputProps>;
  search?: {
    query: string;
    fields: string[];
    options: SearchOperatorOption[]; // Updated to use SearchOperatorOption enum
  };
  extraFilter?: Record<string, OperationInputProps>;
}

export interface GenerateQueryOutputProps {
  filter?: {
    $and?: Array<{ $or?: Array<{ [key: string]: OperationOutputProps }> }>; // filter
  };
  sort: { [key: string]: SortOrder | { $meta: any } };
  populate: PopulateOptions[] | PopulateOptions;
  skip: number;
  limit: number;
}

export enum SearchOperatorOption {
  CaseInsensitive = "i",
  MultiLine = "m",
}
