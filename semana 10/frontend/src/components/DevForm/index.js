import React, {useState, useEffect} from 'react';

export default function DevForm({onSubmit}){
    const [github_username, setGithubUsername] = useState('');
    const [techs, setTechs] = useState('');
  
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(
          (position)=>{
            const {latitude, longitude} = position.coords;
            setLatitude(latitude)
            setLongitude(longitude)
          }, (err)=>{
            console.log(err)
          },
          {
            timeout: 3000,
          }
        );
      },[]);

    async function handleSubmit(e){
        e.preventDefault();


        await onSubmit({
            github_username,
            techs,
            latitude,
            longitude
        });
        setGithubUsername('');
        setTechs('');
      }
    return (
        <form onSubmit={handleSubmit}>
        <div className="input-block">
          <label htmlFor="username_github">Usuário do Github</label>
          <input name="github_username" type="text" value={github_username} onChange={e=>setGithubUsername(e.target.value)} id="username_github" required/>
        </div>
        <div className="input-block">
          <label htmlFor="techs">Tecnologias</label>
          <input name="techs" id="techs" type="text" value={techs} onChange={e=>setTechs(e.target.value)} required/>
        </div>

        <div className="input-group">
          <div className="input-block">
            <label htmlFor="latitude">Latitude</label>
            <input name="latitude" id="latitude" type="number" value={latitude} onChange={e=>setLatitude(e.target.value)} required/>
          </div>
          <div className="input-block">
            <label htmlFor="longitude">Longitude</label>
            <input name="longitude" type="number" id="longitude" value={longitude} onChange={e=>setLongitude(e.targer.value)} required/>
          </div>
        </div>
        <button type="submit">Salvar</button>

          
      </form>

    );

}