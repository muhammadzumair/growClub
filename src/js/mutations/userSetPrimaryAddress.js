import Relay from 'react-relay';

export default class Mutation extends Relay.Mutation {

  getMutation() {
    return Relay.QL`
      mutation { userSetPrimaryAddress }
    `;
  }

  getVariables() {
    return {
      user_id: this.props.user.id,
      address_id: this.props.address.id
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on UserSetPrimaryAddressPayload {
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
    `,
    address: () => Relay.QL`
      fragment on Address {
        id
      }
    `
  }
}
