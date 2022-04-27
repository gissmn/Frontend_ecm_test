import { gql } from "@apollo/client";

export const GET_CALLS = gql`
  query GetCalls($status: String) {
    getCalls(status: $status) {
      _id
      callId
      name
      detail
      type
      status
      device
      price
      category
      dueDate
      userId
      operatorId
    }
  }
`;

export const REGISTER_CALL = gql`
  mutation RegisterCall(
    $name: String
    $detail: String
    $device: String
    $type: String
    $userId: ID
    $category: String
    $dueDate: Date
    $operatorId: ID
  ) {
    registerCall(
      name: $name
      detail: $detail
      device: $device
      type: $type
      userId: $userId
      category: $category
      dueDate: $dueDate
      operatorId: $operatorId
    ) {
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
