import { gql } from '@apollo/client';

export const GET_CATEGORY_BY_NAME = gql`
  query getCategoryByName($name: String) {
    category(name: $name) {
      _id
      name
    }
  }
`;

export const GET_SIGNALMENTS_LIST = gql`
  query Query {
    signalments {
      _id
      name
    }
  }
`;

export const GET_SIGNALED_COMMENTS = gql`
  query Query {
    getSignaledComments {
      _id
      content {
        message
      }
      sender {
        first_name
        email
      }
      signalments {
        sender {
          first_name
        }
        signaled_at
        signalment {
          name
        }
      }
      modified_at
      deleted_at
      created_at
    }
  }
`;

export const GET_COMMENT_BY_SIGNALEMENT_ID = gql`
  query Query($senderId: ObjectID!) {
    getBySenderId(id: $senderId) {
      _id
      content {
        message
      }
      created_at
      deleted_at
      modified_at
      sender {
        _id
        email
        pseudo
        phone
        last_name
        first_name
        comments {
          created_at
          content {
            message
          }
          deleted_at
          modified_at
        }
      }
      target_event {
        content {
          title
        }
        published_at
      }
    }
  }
`;
