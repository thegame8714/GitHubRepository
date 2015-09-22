'use strict';

var React = require('react-native');

var {
	StyleSheet,
	Text,
	View,
	Component,
    ListView,
    ActivityIndicatorIOS,
    Image
} = React;


class SearchResult extends Component{
	constructor(props) {
		super(props);

        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });
		this.state = {
            dataSource: ds,
            showProgress: true,
            searchQuery: props.searchQuery
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
        this.doSearch();
    }

    doSearch() {
     var url = 'https://api.github.com/search/repositories?q=' + encodeURIComponent(this.state.searchQuery);

     fetch(url)
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                repositories: responseData.repositories,
                dataSource: this.state.dataSource.cloneWithRows(responseData.items)
            });
        })
        .finally(() => {
            this.setState({
                showProgress: false
            })
        });


    }

    renderRow(rowData) {
       return (
            <View style={styles.rowContainer}>
                <Text style={{fontSize: 20, fontWeight: '600'}}>
                    {rowData.full_name}
                </Text>

                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 20,
                    marginBottom: 20
                }}>
                    <View style={styles.repoCell}>
                        <Image source={require('image!star')}
                            style={styles.repoCellIcon} />
                        <Text style={styles.repoCellLabel}>
                            {rowData.stargazers_count}
                        </Text>
                    </View>

                     <View style={styles.repoCell}>
                        <Image source={require('image!fork')}
                            style={styles.repoCellIcon} />
                        <Text style={styles.repoCellLabel}>
                            {rowData.forks}
                        </Text>
                    </View>

                     <View style={styles.repoCell}>
                        <Image source={require('image!GitHub-Mark')}
                            style={styles.repoCellIcon} />
                        <Text style={styles.repoCellLabel}>
                            {rowData.open_issues}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    rowContainer: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        borderColor: '#D7D7D7',
        borderBottomWidth: 1,
        backgroundColor: '#FFF'
    },
    repoCell: {
       width: 50,
       alignItems: 'center'
    },
    repoCellIcon: {
        height: 20,
        width: 20,
    },
    repoCellLabel: {
        textAlign: 'center',
    },
    progress: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

module.exports = SearchResult;