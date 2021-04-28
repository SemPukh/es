import './App.css';
import { useState } from 'react';
import { Cities } from './components/Cities';
import { Products } from './components/Products';

function App() {
	

	return (
		<div className="App">
			<Cities />

			<Products />
		</div>
	);
}

export default App;
