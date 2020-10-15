import React,{useState, useEffect} from 'react';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Leaflet from 'leaflet'
import mapMarkerImg from '../assets/map-marker.svg';

import '../styles/pages/orphanage-map.css';
import 'leaflet/dist/leaflet.css';
import Sidebar from '../components/Sidebar';
import api from '../services/api';

const mapIcon = Leaflet.icon({
    iconUrl: mapMarkerImg,

    iconSize:[58, 68],
    iconAnchor:[29, 68],
    popupAnchor:[170,2],
})

interface Orphanage{
    id:number;
    latitude:number;
    longitude:number;
    name:string;
}

export default function OrphanagesMap(){
    const [orphanages, setOrphanages] = useState<Orphanage[]>([])
   
    useEffect(()=>{
        api.get('orphanages').then(response=>{
            setOrphanages(response.data)
        })
    },[])
    
    
    return(
        <div id="page-map">
            <Sidebar />

            <Map 
                center={[-23.5322549,-46.8931377]}
                zoom={15}
                style={{width:'100%', height:'100%'}}
            >
                <TileLayer 
                    url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} 
                />
                {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}

                {orphanages.map(orphanage =>{
                    return(
                        <Marker 
                        key={orphanage.id}
                        icon={mapIcon}
                        position={[orphanage.latitude,orphanage.longitude]}
                    >
                        <Popup closeButton={false} minWidth={248} maxWidth={248} className='map-popup'>
                            {orphanage.name}
                            <Link to={`/orphanages/${orphanage.id}`}>
                               <FiArrowRight size={20} color='#fff'/> 
                            </Link>
                        </Popup>
                    </Marker>
                    )
                })}
            </Map>
            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#FFF"/>
            </Link>
        </div>
    )
}