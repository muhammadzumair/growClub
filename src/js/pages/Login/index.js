import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import { grey500, white, red500, indigo800 } from 'material-ui/styles/colors';
import ThemeDefault from 'js/themes/default';
import Relay from 'react-relay';
import Formsy from 'formsy-react';
import { FormsyText } from 'formsy-material-ui';

import LoginMutation from 'js/mutations/authLogin';
import RegisterMutation from 'js/mutations/authRegister';
import TextDivider from 'js/components/TextDelimeter';


class LoginPage extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor() {
    super();
    this.state = {
      switchLoginRegister: 'login'
    };
  }

  /**
   * Login handler
   *
   * @param model
   * @param reset
   * @param invalidateForm
   */
  login(model, reset, invalidateForm) {
    Relay.Store.commitUpdate(
      new LoginMutation({
        login: model.email,
        password: model.password,
        viewer: this.props.viewer
      }),
      {
        onFailure: (transaction) => {
          const msg = JSON.parse(transaction.getError().source.errors[0].message);
          invalidateForm({
            email: msg.login,
            password: msg.password
          });
        },
        onSuccess: ({ authLogin }) => this.authenticate(authLogin)
      }
    );
  }


  /**
   * Register handler
   *
   * @param model
   * @param reset
   * @param invalidateForm
   */
  register(model, reset, invalidateForm) {
    Relay.Store.commitUpdate(
      new RegisterMutation({
        login: model.email,
        password: model.password,
        viewer: this.props.viewer
      }),
      {
        onFailure: (transaction) => {
          const msg = JSON.parse(transaction.getError().source.errors[0].message);
          invalidateForm({
            email: msg.login,
            password: msg.password
          });
        },
        onSuccess: ({ authRegister }) => this.authenticate(authRegister)
      }
    );
  }


  /**
   * Funkcia ulozi auth token vrateny serverom, ulozi ho do localStorage
   * a presmeruje uzivatela na hlavny Dahsboard
   *
   * @param response Relay mutation serverresponse
   */
  authenticate(response) {
    const token = response.token;
    localStorage.setItem('bearer_token', token);
    this.context.router.push('/');
  }


  /**
   * take care about toggle between login and register
   *
   * @param {string} type - if type is 'login' login is rendered,
   *  if type is 'register' register is rendered
   */
  handleToggleLoginRegister(type) {
    this.setState({
      switchLoginRegister: type
    });
  }


  /**
   * take care of rendering Login form
   *
   * @param styles
   * @returns {XML}
   */
  renderLoginForm(styles) {
    return (
      <Formsy.Form
        ref="login_form"
        onValidSubmit={this.login.bind(this)}>

        <FormsyText
          name="email"
          floatingLabelText="E-Mail"
          fullWidth={true}
          validations="isEmail"
          validationError="Please enter a valid email address"
          required
        />

        <FormsyText
          name="password"
          type="password"
          floatingLabelText="Password"
          fullWidth={true}
          required
        />

        <Toggle
          label="Zapamätaj si ma"
          iconStyle={styles.checkRemember.iconStyle}
          labelStyle={styles.checkRemember.labelStyle}
          style={styles.checkRemember.style}
        />

        <RaisedButton
          type="submit"
          label="Login"
          secondary={true}
          fullWidth={true}
          buttonStyle={styles.btnSubmit}
          style={styles.btn}
        />

        <TextDivider title="alebo"/>

        <RaisedButton
          href=""
          target="_blank"
          label="Prihlásiť sa cez google"
          secondary={true}
          buttonStyle={styles.btnGoogle}
          icon={<i style={styles.faIcon} className="fa fa-google"/>}
          fullWidth={true}
          style={styles.btn}
        />

        <RaisedButton
          href=""
          target="_blank"
          label="Prihlásiť sa cez facebook"
          secondary={true}
          buttonStyle={styles.btnFacebook}
          icon={<i style={styles.faIcon} className="fa fa-facebook"/>}
          fullWidth={true}
          style={styles.btn}
        />

        <div style={styles.btnForgotten}>
          <Link to="/">Zabudol som heslo</Link>
        </div>

      </Formsy.Form>
    );
  }


  /**
   * take care of rendering Register form
   *
   * @param styles
   * @returns {XML}
   */
  renderRegisterForm(styles) {
    return (
      <Formsy.Form
        ref="register_form"
        reset={true}
        onValidSubmit={this.register.bind(this)}
      >
        <FormsyText
          name="email"
          floatingLabelText="E-Mail"
          fullWidth={true}
          validations="isEmail"
          validationError="Prosím, zadajte platný email"
          required
        />

        <FormsyText
          name="password"
          type="password"
          floatingLabelText="Heslo"
          validations={{
            matchRegexp: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
          }}
          validationError="Slabé heslo! Heslo musí mať aspon 8 znakov, jedno číslo, jedno malé a velké písmeno"
          fullWidth={true}
          required
        />

        <FormsyText
          name="password_again"
          type="password"
          floatingLabelText="Zopakovať heslo"
          validations="equalsField:password"
          validationError="Heslá sa nezhodujú"
          fullWidth={true}
          required
        />

        <RaisedButton
          type="submit"
          label="Registrovať"
          secondary={true}
          fullWidth={true}
          buttonStyle={styles.btnSubmit}
          style={styles.btn}
        />

      </Formsy.Form>
    );
  }


  componentDidUpdate() {
    if (this.state.switchLoginRegister === 'register') {
      this.refs.register_form.reset();
    }
  }


  render() {
    const {
      switchLoginRegister
    } = this.state;

    const styles = {
      loginContainer: {
        minWidth: 320,
        maxWidth: 400,
        height: 'auto',
        position: 'absolute',
        top: '20%',
        left: 0,
        right: 0,
        margin: 'auto'
      },
      loginTitle: {
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: '20px',
        marginBottom: '15px'
      },
      selectButtons: {
        width: '50%'
      },
      paper: {
        padding: 20,
        overflow: 'auto'
      },
      buttonsDiv: {
        padding: 10
      },
      checkRemember: {
        style: {
          float: 'left',
          padding: '15px 0'
        },
        labelStyle: {
          color: grey500
        },
        iconStyle: {
          color: grey500,
          borderColor: grey500,
          fill: grey500
        }
      },
      btn: {
        margin: '5px 0'
      },
      btnSubmit: {
        background: ThemeDefault.palette.primary1Color
      },
      btnFacebook: {
        background: indigo800
      },
      btnGoogle: {
        background: red500
      },
      btnForgotten: {
        padding: '10px 0',
        width: '100%',
        textAlign: 'center'
      },
      faIcon: {
        color: white,
        float: 'left',
        marginTop: 10
      }
    };

    return (
      <MuiThemeProvider muiTheme={ThemeDefault}>
        <div style={styles.loginContainer}>
          <Paper style={styles.paper}>

            <FlatButton
              onClick={() => this.handleToggleLoginRegister('login')}
              label="Prihlasenie"
              style={styles.selectButtons}
              primary={switchLoginRegister === 'login'} />

            <FlatButton
              onClick={() => this.handleToggleLoginRegister('register')}
              label="Registracia"
              style={styles.selectButtons}
              primary={switchLoginRegister === 'register'} />

            {
              (this.state.switchLoginRegister === 'login') ?
                this.renderLoginForm(styles)
                :
                this.renderRegisterForm(styles)
            }
          </Paper>
        </div>
      </MuiThemeProvider>
    );
  }
}


export default Relay.createContainer(LoginPage, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        ${LoginMutation.getFragment('viewer')}
        ${RegisterMutation.getFragment('viewer')}
      }
    `,
  }
});
