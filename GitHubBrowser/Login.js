'use strict';

var React = require('react-native');
var buffer = require('buffer');

var {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Image,
	TextInput,
	TouchableHighlight,
	Component,
	ActivityIndicatorIOS
} = React;

class Login extends Component{
	constructor(props) {
		super(props);

		this.state = {
			showProgress: false
		}
	}

	render() {

		var errorCtrl = <View />;

		if(!this.state.success && this.state.badCredentials) {
			errorCtrl = <Text style={styles.error}>
				That username and password combination did not work
				</Text>
		}

		if(!this.state.success && this.state.unkownError) {
			errorCtrl = <Text style={styles.error}>
				We experienced an unexpected issue
				</Text>
		}

		return(

			<View style={styles.container}>
				<Image style={styles.logo}
				source={require('image!Octocat')} />
				<Text style={styles.heading}>
				GitHub Browser
				</Text>
				<TextInput 
				style={styles.input} 
				onChangeText={(text) => this.setState({
					username: text
				})} 
				placeholder="GitHub Username" />

				<TextInput 
				style={styles.input} 
				onChangeText={(text) => this.setState({
					password: text
				})} 
				placeholder="GitHub Password" 
				secureTextEntry="true"/>

				<TouchableHighlight
				onPress={this.onLoginPressed.bind(this)}
				style={styles.button}>
					<Text style={styles.buttonText}>Log In</Text>
				</TouchableHighlight>

				{errorCtrl}

				<ActivityIndicatorIOS 
					animating={this.state.showProgress} 
					size="large"
					style={styles.loader} />
			</View>
		);
	}

	onLoginPressed() {
		
		this.setState({
			showProgress:true
		});

		var authService = require('./AuthService');
		authService.login({
			username: this.state.username,
			password: this.state.password
		},(results) => {
			this.setState(results)

			if(results.success && this.props.onLogin) {
				this.props.onLogin();
			}
		});


	}
}


var styles = StyleSheet.create({
	container: {
		backgroundColor: '#F5FCFF',
		flex: 1,
		paddingTop: 40,
		alignItems:'center',
		padding: 10
	},
	logo: {
		width: 66,
		height: 55
	},
	heading: {
		fontSize: 30,
		marginTop: 10
	},
	input: {
		height: 50,
		marginTop: 10,
		padding: 4,
		fontSize: 18,
		borderWidth: 1,
		borderColor: '#48bbec'
	},
	button: {
		height: 50,
		backgroundColor: "#48BBEC",
		alignSelf: 'stretch',
		marginTop: 10,
		justifyContent: 'center'
	},
	buttonText: {
		fontSize: 22,
		color: "#FFF",
		alignSelf: 'center'
	},
	loader: {
		marginTop: 20
	},
	error: {
		color: 'red',
		paddingTop: 10
	}
})

module.exports = Login;