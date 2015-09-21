'use strict';

var React = require('react-native');
var buffer = require('buffer');

var {
	StyleSheet,
	Text,
	View,
	Image,
	Component,
	ActivityIndicatorIOS,
	TabBarIOS
} = React;

class AppContainer extends Component{
	constructor(props) {
		super(props);

		this.state = {
			selectedTab: 'feed'
		}
	}

	render() {
		return (
        	<TabBarIOS style={styles.container}>
        		<TabBarIOS.Item title="Feed"
        			selected={this.state.selectedTab == 'feed'}
        			icon={require('image!inbox')} 
        			style={styles.tab}
        			onPress={() => this.setState({
        				selectedTab: 'feed' })}
        		>
        			<Text style={styles.welcome}>Tab 1</Text>
    			</TabBarIOS.Item>
    			<TabBarIOS.Item title="Search"
        			selected={this.state.selectedTab == 'search'}
        			icon={require('image!search')} 
        			style={styles.tab}
        			onPress={() => this.setState({
        				selectedTab: 'search' })}
        		>
        			<Text style={styles.welcome}>Tab 2</Text>
    			</TabBarIOS.Item>
        	</TabBarIOS>
      	);
	}
}


var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  tab: {
  	width: 10,
  	height: 10
  }
});

module.exports = AppContainer;