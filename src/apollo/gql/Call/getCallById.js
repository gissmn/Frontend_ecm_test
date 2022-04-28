import { gql } from "@apollo/client";

export const GET_CALL_BY_ID = gql`
  query GetCallById($_id: ID) {
    getCallById(_id: $_id) {
      _id
      callId
      name
      detail
      type
      status
      device
      category
      price
      dueDate
      userId
      operatorId
    }
  }
`;
