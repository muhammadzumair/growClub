import Relay from 'react-relay';

export default class Mutation extends Relay.Mutation {

  getMutation() {
    return Relay.QL`
      mutation { userAddAddress }
    `;
  }

  getVariables() {
    return {
      user_id: this.props.user.id,
      address: this.props.address
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on UserAddAddressPayload {
        user {
          addresses
        }
      }
    `;
  }

  getConfigs() {
    return [
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: {
          user: this.props.user.id
        }
      }
    ];
  }

  static fragments = {
    user: () => Relay.QL`
      fragment on User {
        id
      }
    `
  }
}
