'use strict';

var React = require('react-native');
var buffer = require('buffer');
var moment = require('moment');

var {
	StyleSheet,
	Text,
	View,
	Component,
    ListView,
    Image,
} = React;


class PushPayload extends Component{
	constructor(props) {
		super(props);

        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });
		this.state = {
            dataSource: ds.cloneWithRows(props.pushEvent.payload.commits),
            pushEvent: props.pushEvent
		}
	}

    renderRow(rowData) {
        return (
            <View style={{flex: 1, 
                justifyContent: 'center',
                borderColor: '#D7D7D7',
                borderBottomWidth: 1,
                borderTopWidth: 1,
                paddingTop: 20,
                paddingBottom: 20,
                padding: 10
            }}>
                <Text>{rowData.sha.substring(0,6)} - {rowData.message}</Text>
            </View>
        )
    }

	render() {
		return (
            <View style={styles.listItem}>
                <Image source={{uri: this.state.pushEvent.actor.avatar_url}}
                style={styles.itemImg} />

                <Text style={{
                    paddingTop: 20,
                    paddingBottom: 20,
                    fontSize: 20
                }}>
                {moment(this.state.pushEvent.created_at).fromNow()}
                </Text>
                <Text>
                {this.state.pushEvent.actor.login} pushed to
                </Text>
                 <Text>
                {this.state.pushEvent.payload.ref.replace('refs/heads/','')}
                </Text>
                 <Text>
                 at {this.state.pushEvent.repo.name}
                </Text>

                <Text style={{
                    paddingTop: 40,
                    fontSize: 20
                }}>
                {this.state.pushEvent.payload.commits.length} Commits
                </Text>

                <ListView 
                    contetnInset={{
                        top: -100
                    }}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)} />
            </View>
      	);
	}

  
}

var styles = StyleSheet.create({
    listItem: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: 80,
        alignItems: 'center'
    },
    itemImg:{ 
        height: 120,
        width: 120,
        borderRadius: 60
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
        justifyContent:'center'
    }
});

module.exports = PushPayload;