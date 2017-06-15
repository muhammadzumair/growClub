import Relay from 'react-relay';

export const ViewerQuery = {
  viewer: Component => Relay.QL`
    query {
      viewer {
        ${Component.getFragment('viewer')}
      }
    }
  `
};

export const CourseQuery = {
  course: Component => Relay.QL`
    query {
      node(id: $id) {
        ${Component.getFragment('course')},
      },
    }
  `
};
