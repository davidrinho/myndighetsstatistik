import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import '../scss/Subpicker.scss';
import Card from '../components/Card';
import data from '../components/Myndigheter';
import JsonCard from '../components/JsonCard';
import {capitalizeFirstLetter, getFeaturesFHM} from '../components/Utils';
import Home from '../components/Home';




const Subpicker = () => {

    const [available, setAvailable] = useState(false);
    const [books, setBooks] = useState([]);
    const [bookUrl, setBookUrl] = useState(null);
    const [jsonArr, setJsonArr] = useState(null);
    const viewerUrl = "https://view.officeapps.live.com/op/embed.aspx?src=";

    let {myndighet} = useParams();

    const setViewerActive = (type) => {
        let viewer = document.querySelector(".viewer")

        if (!(viewer.classList.contains("active-json")) && !(viewer.classList.contains("active-excel"))) {
            viewer.classList.toggle(`active-${type}`);
            viewer.scrollIntoView(true);
        }
    }

    const fetchData = () => {
        myndighet = myndighet.toLowerCase();
        if (data[myndighet]) {
            setAvailable(true);
            setBooks(Object.keys(data[myndighet]));
        }
    }

    const setIframeSrc = (url) => {
        setBookUrl(url);
        setViewerActive("excel");
    }

    const fetchJsonData = (url) => {
        fetch(url)
            .then((response) => response.json())
            .then((json) => {
                setJsonArr(json.features);
            })
        setViewerActive("json");
    }

    const handleActionType = (obj) => {
        let {type, url} = obj;
        switch (type) {
            case "excel":
                setIframeSrc(url);
                break;
            case "json":
                fetchJsonData(url);
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        fetchData();       
    }, []);
    return (
        <div>
            <Home />
            {available ? 
                <div>
                <div className="pickerContainer">
                    <div className="menuContainer">
                        <i className="fa-solid fa-angles-up" 
                            onClick={() => {
                                let top = document.querySelector(".pickerContainer");
                                top.scrollIntoView(true);
                        }}></i>
                        {bookUrl ? 
                            <i className="fa-solid fa-angles-down" 
                                onClick={() => {
                                    let bottom = document.querySelector(".viewer");
                                    bottom.scrollIntoView(true);
                            }}></i>
                        : ""}
                        
                    </div>
                    <h1 className="pickerHeader">{capitalizeFirstLetter(myndighet)}</h1>
                    <div className="contentContainer">
                        {books.map((item, index) => {
                            return (
                                <Card
                                    key={index}
                                    name={item}
                                    size="small"
                                    func={() => handleActionType(data[myndighet][item])}
                                />
                            )
                        })}       
                    </div>
                </div>
                    <div className="viewer">
                        {bookUrl ?
                                <iframe frameBorder="0" width={"100%"} height="90%" src={viewerUrl + bookUrl} />
                            : ""}
                        {jsonArr ?
                            jsonArr.map((item) => {
                                return (
                                    JsonCard(item.properties)
                                )
                            })
                        : ""}
                    </div>
                </div>
            : <h2>No bueno</h2>}
            
        </div>
    )
}


export default Subpicker;