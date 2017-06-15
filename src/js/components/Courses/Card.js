import React, { Component } from 'react';
import {
  Card,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from 'material-ui/Card';

// Avatar
import profilePhoto from 'assets/images/profile-avatar.png';

class CardComponent extends Component {
  render() {
    const {
      trainer,
      courseName,
      courseDescription,
      imageSource,
      onCourseClick
    } = this.props;

    const styles = {
      card: {
        marginBottom: 30
      },
      title: {
        paddingTop: 5,
        paddingBottom: 3
      },
      description: {
        padding: 15
      }
    };

    return (
      <div className="col-sm-6 col-md-6 col-lg-4">
        <Card onClick={onCourseClick} style={styles.card} zDepth={2}>
          <CardHeader
            avatar={profilePhoto}
            title={trainer}
            subtitle="trainer"
          />
          <CardMedia
            overlay={<CardTitle title={courseName} />}
          >
            <img src={imageSource} />
          </CardMedia>

          <CardText style={styles.description}>
            {courseDescription}
          </CardText>
        </Card>
      </div>
    );
  }
}

export default CardComponent;
