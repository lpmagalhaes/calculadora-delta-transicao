import React from 'react' 

function App() {

	const pernasIniciais = []
	for(let x = 1; x <= 6; x++){
		const perna = {
			id: x,
			tipo: 0,
			strike: '',
			compraVenda: 0,
			quantidade: 1
		}

		pernasIniciais.push(perna)
	}

	const [pernas, setPernas] = React.useState(pernasIniciais)
	const [resultado, setResultado] = React.useState([])
	const [strikeInicial, setStrikeInicial] = React.useState(20)
	const [strikeFinal, setStrikeFinal] = React.useState(32)

	const limpar = () => {
		setPernas(pernasIniciais)
		setResultado([])
	}

	const calcular = () => {
		let listaResultado = []

		for(let x = strikeInicial; x <= strikeFinal; x++){
			let valor = 0
			for(const perna of pernas){
				let valorPerna = 0
				if(
					perna.tipo > 0 &&
					perna.compraVenda > 0 &&
					perna.strike > 0 &&
					perna.quantidade > 0){
					if(perna.tipo === 1){
						if(perna.strike < x){
							valorPerna = x - perna.strike	
						}
					}
					if(perna.tipo === 2){
						if(perna.strike > x){
							valorPerna = perna.strike- x
						}
					}
				}

				valorPerna = valorPerna * perna.quantidade

				if(perna.compraVenda === 2){
					valorPerna = valorPerna * -1
				}


				valor += valorPerna
			}
			listaResultado.push({strike: x, valor})
		}

		setResultado(listaResultado)
	}


	return (
		<div>
			<span>Calculadora de Delta de Transição</span>

			{
				pernas.map(perna => {
					return <div key={`perna${perna.id}`}>
						<br />
						<span>Perna {perna.id}</span>
						<br />
						<span>
							Tipo
							<select value={perna.tipo} onChange={(event) => setPernas(prevState => {
								let newState = prevState.map(state => {
									if(state.id === perna.id){
										state.tipo = parseInt(event.target.value)
									}
									return state
								})
								return newState
							})}>
								<option value={0}>selecione</option>
								<option value={1}>CALL</option>
								<option value={2}>PUT</option>
							</select>
						</span>
						<br />
						<span>
							Compra/Venda
							<select value={perna.compraVenda} onChange={(event) => setPernas(prevState => {
								let newState = prevState.map(state => {
									if(state.id === perna.id){
										state.compraVenda = parseInt(event.target.value)
									}
									return state
								})
								return newState
							})}>
								<option value={0}>selecione</option>
								<option value={1}>Compra</option>
								<option value={2}>Venda</option>
							</select>
						</span>
						<br />
						<span>
							Strike
							<input value={perna.strike} type="number" onChange={(event) => setPernas(prevState => {
								let newState = prevState.map(state => {
									if(state.id === perna.id){
										state.strike = parseInt(event.target.value)
									}
									return state
								})
								return newState
							})}/>
						</span>
						<br />
						<span>
							Quantidade
							<input value={perna.quantidade} type="number" onChange={(event) => setPernas(prevState => {
								let newState = prevState.map(state => {
									if(state.id === perna.id){
										state.quantidade = parseInt(event.target.value)
									}
									return state
								})
								return newState
							})}/>
						</span>
					</div>
				})
			}

			<br />
			<span>
				Strike Inicial
				<input value={strikeInicial} type="number" onChange={(event) => setStrikeInicial(parseInt(event.target.value))} />
			</span>
			<br />
			<span>
				Strike Final
				<input value={strikeFinal} type="number" onChange={(event) => setStrikeFinal(parseInt(event.target.value))} />
			</span>

			<br />
			<button type='button' onClick={() => calcular()}>
				Calcular
			</button>
			<br />
			<button type='button' onClick={() => limpar()}>
				Limpar
			</button>

			{
				resultado.map(item => <div key={`item${item.strike}`}>
					<br />
					{item.strike} => {item.valor}
				</div>)
			}
		</div>
	);
}

export default App;
