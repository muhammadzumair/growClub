import Relay from 'react-relay';

export default class Mutation extends Relay.Mutation {

  getMutation() {
    return Relay.QL`
      mutation { authLogout }
    `;
  }

  getVariables() {}

  getFatQuery() {
    return Relay.QL`
      fragment on AuthLogoutPayload {
        viewer {
          me
        }
      }
    `;
  }

  getConfigs() {
    return [
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: {
          viewer: this.props.viewer.id
        }
      }
    ];
  }

  static fragments = {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id
      }
    `
  }
}
