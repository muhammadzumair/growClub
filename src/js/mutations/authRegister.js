import Relay from 'react-relay';

export default class Mutation extends Relay.Mutation {

  getMutation() {
    return Relay.QL`
      mutation { authRegister }
    `;
  }

  getVariables() {
    return {
      login: this.props.login,
      password: this.props.password,
      role: this.props.role,
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on AuthRegisterPayload {
        token,
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
      },
      {
        type: 'REQUIRED_CHILDREN',
        children: [Relay.QL`
          fragment on AuthRegisterPayload {
            token
            viewer
          }
        `]
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
