import { gql } from "@apollo/client";

export const GET_CALL_LOGS = gql`
  query GetLogs($callId: ID) {
    getLogs(callId: $callId) {
      _id
      type
      adminId
      desc
      callId
    }
  }
`;
