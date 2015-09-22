'use strict';

var React = require('react-native');
var buffer = require('buffer');
var moment = require('moment');
var PushPayload = require('./PushPayload');

var {
	StyleSheet,
	Text,
	View,
	Component,
    ListView,
    ActivityIndicatorIOS,
    Image,
    TouchableHighlight
} = React;


class Feed extends Component{
	constructor(props) {
		super(props);

        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });
		this.state = {
            dataSource: ds,
            showProgress: true
		}
	}

	render() {
        if(this.state.showProgress) {
            return (
                <View style={styles.progress}>
                    <ActivityIndicatorIOS 
                        size="large"
                        animating={true} />
                </View>
            )
        }

		return (
            <View style={styles.list}>
                <ListView 
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)} />
            </View>
      	);
	}

    componentDidMount() {
        this.fetchFeed();
    }

    fetchFeed() {
        require('./AuthService').getAuthInfo((err,authInfo) => {
            var url = "https://api.github.com/users/" + authInfo.user.login + "/events";
            fetch(url, {
                headers: authInfo.header
            }).then((response) => response.json())
            .then((responseData) =>  {
                var feedItems = responseData.filter((ev) => ev.type == "PushEvent");

             
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(feedItems),
                    showProgress: false
                });
            });
        });
    }

    pressRow(rowData) {
        this.props.navigator.push({
            title: 'Push Event',
            component: PushPayload,
            passProps: {
                pushEvent: rowData
            }
        });
    }   

    renderRow(rowData) {
       return (
            <TouchableHighlight 
                onPress={() => this.pressRow(rowData)}
                underlayColor="#ddd">
            <View style={styles.rowContainer}>
                <Image source={{uri: rowData.actor.avatar_url}}
                    style={styles.rowImg} />

                <View style={styles.rowDetails}>
                    <Text style={styles.rowText}>
                        {moment(rowData.created_at).fromNow()}
                    </Text>
                    <Text style={styles.rowText}>
                        <Text style={{fontWeight: 'bold'}}>{rowData.actor.login}</Text> pushed to
                    </Text>
                    <Text style={styles.rowText}>
                        {rowData.payload.ref.replace('refs/heads/','')}
                    </Text>
                    <Text style={styles.rowText}>
                       at <Text style={{fontWeight: 'bold'}}>{rowData.repo.name}</Text>
                    </Text>
                </View>
            </View>
            </TouchableHighlight>
        )
    }
}

var styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    rowContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
        borderColor: '#D7D7D7',
        borderBottomWidth: 1
    },
    rowImg: {
        height: 36,
        width: 36,
        borderRadius: 18
    },
    rowDetails: {
        paddingLeft: 20,
    },
    rowText: {
        color: '#333',
    }, 
    progress: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center'
    }
});

module.exports = Feed;