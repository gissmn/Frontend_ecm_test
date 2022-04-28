import { gql } from "@apollo/client";

export const CANCEL_CALL = gql`
  mutation CancelCall($callId: ID, $desc: String) {
    cancelCall(callId: $callId, desc: $desc) {
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
