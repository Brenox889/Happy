import React from 'react';
import {Map, TileLayer} from 'react-leaflet';
import { FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import mapMarkerImg from '../assets/map-marker.svg';

import '../styles/pages/orphanage-map.css';
import 'leaflet/dist/leaflet.css';

export default function OrphanagesMap(){
    return(
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy"/>
               
                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita</p>
                </header>

                <footer>
                    <strong>São Paulo</strong>
                    <span>Barueri</span>
                </footer>
            </aside>

            <Map 
                center={[-23.5322549,-46.8931377]}
                zoom={15}
                style={{width:'100%', height:'100%'}}
            >
                <TileLayer 
                    url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} 
                />
                {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
            </Map>
            <Link to="" className="create-orphanage">
                <FiPlus size={32} color="#FFF"/>
            </Link>
        </div>
    )
}