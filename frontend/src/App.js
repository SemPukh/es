import './App.css';
import { useState } from 'react';
import { Cities } from './components/Cities';
import { Products } from './components/Products';
import { Kubevious } from './components/Kubevious';

function App() {
	

	return (
		<div className="App">
			<Cities />

			<Products />

			<Kubevious />
		</div>
	);
}

export default App;
