import React from 'react';
import { typography } from 'material-ui/styles';
import { pink600, orange600, grey600 } from 'material-ui/styles/colors';
import InfoBox from 'js/components/InfoBox';
import Face from 'material-ui/svg-icons/action/face';
import ShoppingCart from 'material-ui/svg-icons/action/shopping-cart';

const styles = {
  navigation: {
    fontSize: 17,
    fontWeight: typography.fontWeightLight,
    color: grey600,
    paddingBottom: 15,
    display: 'block'
  }
};

const DashboardPage = () => (
  <div>
    <h3 style={styles.navigation}>Dashboard</h3>

    <div className="row">

      <div className="col-xs-12 col-sm-6 m-b-15 ">
        <InfoBox Icon={ShoppingCart}
                 color={pink600}
                 title="Kreditov"
                 value="1500k"
        />
      </div>

      <div className="col-xs-12 col-sm-6 m-b-15 ">
        <InfoBox Icon={Face}
                 color={orange600}
                 title="Zamestnancov"
                 value="248"
        />
      </div>
    </div>
  </div>
);


export default DashboardPage;
