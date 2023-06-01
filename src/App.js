import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './style.css';

import api from './services/api';


function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})

  async function handleSearch(){
   

    if(input === ""){
      alert("Preencha algum cep!")
      return
    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput("")                            //para o input voltar a ficar vazio//

    }catch{
      alert("Ops, erro ao buscar cep!")
      setInput("")                          //para o input voltar a ficar vazio//
    }
    
  }

  return (
    <div className="container">
       <h1 className="title">Buscador de Cep</h1>
       <div className="containerInput">
          <input 
          type="number" 
          placeholder="Digite seu cep..."
          value={input}
          onChange={(e) => setInput(e.target.value) }
          />

          <button className="buttonSearch" onClick={handleSearch}>
            <FiSearch siza={25} color="#fff"/></button>
          
       </div>


        {Object.keys(cep).length > 0 && (
          <main className='main'>
            <h2>{cep.cep}</h2>

            <span>{cep.logradouro}</span>
            <span>Complemento: {cep.complemento}</span>
            <span>{cep.bairro}</span>
            <span>{cep.localidade} - {cep.uf}</span>
          </main>
        )}
       
    </div>
  );
}

export default App;
