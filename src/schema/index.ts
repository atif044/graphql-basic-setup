import {mergeTypeDefs} from "@graphql-tools/merge"

import { userGraphQLSchema } from "./user"

export const mergedGQLSchema = mergeTypeDefs([userGraphQLSchema])