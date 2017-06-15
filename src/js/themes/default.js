import getMuiTheme from 'material-ui/styles/getMuiTheme';
import theme from './growclubTheme';

const themeDefault = getMuiTheme(Object.assign(theme, {
  appBar: {
    width: 305,
    height: 80
  },
  drawer: {
    width: 300
  },
  menuItem: {
    dataHeight: 50
  }
}));


export default themeDefault;
