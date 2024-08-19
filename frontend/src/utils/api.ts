// api.ts

import axios from 'axios';
import { GraphQLResponse } from './types';

export const fetchGraphQLData = async<T>(endpoint: string, query: string) => {
    const response = await axios.post<GraphQLResponse<T>>(endpoint, {
        query,
    });
    return response.data.data;
};