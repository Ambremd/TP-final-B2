 import {useCallback, useEffect, useState} from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

function App() {

   const [tableau, settableau] = useState([])
   const [titre, settitre] = useState([])
   const [description, setdescription] = useState([])
   const [note, setnote] = useState([])
   const [date, setdate] = useState([])

  useEffect(() =>{
    const main = async () => {
      const response = await fetch("http://localhost:1337/api/video-games")
      const data = await response.json()
      console.log('data', data)
      settableau(data.data)
    }

  main()
  }, [])
 

  const handlesupprimer = useCallback((id) =>{
    const supprimer = async () => {
      await fetch("http://localhost:1337/api/video-games/"+ id,{
          method: "DELETE",
              })

      location.reload()
  }
  
  supprimer()
  }, [])


   const titrechange = useCallback((e) => {
    settitre(e.target.value)
  }, [])

  const descritionchange = useCallback((e) => {
    setdescription(e.target.value)
  }, [])

  const notechange = useCallback((e) => {
    setnote(e.target.value)
  }, [])

  const datechange = useCallback((e) => {
    setdate(e.target.value)
  }, [])

  const creer = useCallback(() =>{
    const nouveaux = async () => {
      await fetch("http://localhost:1337/api/video-games",{
          method: "POST",
          headers: {
              "content-type": "application/json"
          },
          body: JSON.stringify(
              {
              "data":{
              "title": titre,
              "description": description,
              "note": note,
              "available_date": date
          }
          })
      })
      location.reload()
  
  }
  nouveaux()
  }, [titre, description, note, date])



  return (
    <>
      <h1>Jeux vidéo</h1>
      <div className='tableau'>
        <table
        >
        <thead>
          <tr>
            <th scope="col">Titre</th>
            <th scope="col">description</th>
            <th scope="col">note</th>
            <th scope="col">date de sortie</th>
          </tr>
        </thead>
        <tbody>
          {tableau.map((ligne, index) => (
            <tr key={index}>
              <td>{ligne.title}</td>
              <td>{ligne.description}</td>
              <td>{ligne.note}</td>
              <td>{ligne.available_date}</td>
              <td>
                {/* onClick={()=> modifier(ligne.documentId)} */}
                <button >Modifier</button>
                <button onClick={()=> handlesupprimer(ligne.documentId)}>Suprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
        </table>

      </div>
      <div>
        <h2>Ajouter un jeux :</h2>
          <input
          value={titre}
          onChange={titrechange}
          type='text'
          placeholder='titre'>
          </input>
          <input
          value={description}
          onChange={descritionchange}
          type='text'
          placeholder='description'>
          </input>
          <input
          value={date}
          onChange={datechange}
          type='date'>
          </input>
          <input
          value={note}
          onChange={notechange}
          type='text'
          placeholder='note'>
          </input>
          <button onClick={creer}>Créer</button>
      </div>
    </>
  )
}

export default App
