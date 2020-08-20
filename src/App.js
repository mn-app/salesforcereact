import React, { Component } from 'react';
import LCC from 'lightning-container';

import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			exampleMessageValue: 'Hello from React!',
			fetchedData: '',
		};
	}

	componentDidMount() {
		LCC.addMessageHandler(this.messageRecievedHandler);
	}

	messageRecievedHandler(msg) {
		const { name, value } = msg;

		console.log('Messaged received.');
		console.log(`Message name: ${name}`);
		console.log(`Message value: ${value}`);

		// Add Any Logic that should be handled here.

		switch (name) {
			case 'example':
				console.log('Handle Example Messgage');
				break;
			default:
				console.log('Do Nothing');
		}
	}

	sendMessage(msg) {
		// Message format should be an object like { name: "messageName", value: "message value"}
		LCC.sendMessage(msg);
	}

	sendMessageExample() {
		// You can wrap the send message function to easily send specific message types.

		this.sendMessage({
			name: 'example',
			value: this.state.exampleMessageValue,
		});
	}

	fetchData() {
		this.setState({ fetchedData: 'start fetching...' });
		fetch('https://api.npoint.io/30855e03c0357e27a1c5')
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					this.setState({ fetchedData: 'Loading error:' + response.statusText });
				}
			})
			.then((json) => this.setState({ fetchedData: JSON.stringify(json) }))
			.catch((error) => this.setState({ fetchedData: error.message }));
	}

	fetchDataApex() {
		this.setState({ fetchedDataApex: 'start fetching...' });
		LCC.callApex(
			'ApexFetch.ff',
			(result) => {
				console.log('result', result);
				this.setState({ fetchedDataApex: result.replace(/&quot;/g, '"') });
			},
			{ escape: true }
		);
	}

	render() {
		return (
			<div>
				<p>A React Component!</p>
				<button onClick={this.sendMessageExample.bind(this)}>A Button that sends a specific exampleMessage</button>
				<button onClick={this.fetchData.bind(this)}>Fetch data</button>
				fetched data:{this.state.fetchedData}
				<div>
					<button onClick={this.fetchDataApex.bind(this)}>Fetch data (Apex)</button>
					{this.state.fetchedDataApex}
				</div>
			</div>
		);
	}
}

export default App;
