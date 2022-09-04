import React from "react";
import axios from "axios";


export default function App() {

    const [data, setData] = React.useState(null);
    const [location, setLocation] = React.useState('Delhi');
    const [input, setInput] = React.useState('');
    const [errMes, setErr] = React.useState('');
    const [shake, setShake] = React.useState(false);
    const [dark, setDarkmode] = React.useState(true);



    const dateBuilder = (d) => {
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day}, ${date} ${month} ${year}`
    }

const handleClick = (e) => {
        setInput(e.target.value);
    }



    const handleSubmit = (e) => {
        if (input !== '')
            setLocation(input);
        const inputValue = document.querySelector("input");


        if (inputValue.value === '') {
            setShake(true);

            setTimeout(() => {
                setShake(false);
            }, 200);
        }
        inputValue.value = '';


        e.preventDefault();
    }


    const APIkey = `5d6e0932a8143004661097d73fe18976`;

    React.useEffect(() => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;

        axios.get(url).then(res => {
            setTimeout(() => {
                setData(res.data);
            }, 10);
        }).catch(err => {
            setErr(err);
        });
    }, [location]);



    function getWindowSize() {
        const { innerWidth, innerHeight } = window;
        return { innerWidth, innerHeight };
    }



    const [windowSize, setWindowSize] = React.useState(getWindowSize());

    React.useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);



    React.useEffect(() => {
        const timer = setTimeout(() => {
            setErr('');
        }, 1400);
        return () => clearTimeout(timer);
    }, [errMes]);


    if (!data) {
        return (
            <div className={"load"}>
                <div></div>
            </div>
        )
    }

    const def = "https://cdn-icons-png.flaticon.com/128/1163/1163661.png";

    let icon;

    const ic = data.weather[0].main;


    switch (data.weather[0].main) {
        case 'Clouds':
            icon = "https://cdn-icons-png.flaticon.com/512/414/414927.png";
            break;
        case 'Haze':
            icon = "https://cdn-icons-png.flaticon.com/512/1197/1197102.png";
            break;
        case 'Clear':
            icon = "https://cdn-icons-png.flaticon.com/512/869/869869.png";
            break;
        case 'Rain':
            icon = "https://img.icons8.com/color/344/rain--v1.png";
            break;
        case 'Dust':
            icon = "https://cdn-icons-png.flaticon.com/128/3071/3071002.png";
            break;
        case 'Drizzle':
            icon = "https://img.icons8.com/external-tulpahn-flat-tulpahn/344/external-drizzle-weather-tulpahn-flat-tulpahn-1.png";
            break;
        case 'Snow':
            icon = "https://img.icons8.com/arcade/344/experimental-snow-arcade.png";
            break;
        case 'Thunderstorm':
            icon = "https://cdn-icons-png.flaticon.com/512/3445/3445722.png";
            break;
        case 'Mist':
            icon = "https://cdn-icons-png.flaticon.com/512/3313/3313998.png";
            break;
        default:
            icon = { def };
            break;
    }

    function darkMode() {
        setDarkmode(prev => prev = !prev);
    }

    return (
        <>
            <div className={`every ${!dark ? "dark--Mode" : "white--Mode"}`}>
                <button onClick={darkMode}><div className={dark ? "darkMode dark" : "darkMode white"}></div></button>
                <div className="all">
                    {errMes && <div className="err shake">{`${errMes.response.data.message}`}</div>}
                    <div className={shake ? "mid shake" : "mid"}>
                        <form>
                            <input type="text" className={dark ? "" : "cardDark"} onChange={(e) => { handleClick(e) }} placeholder="Search City or Country" />
                            <button onClick={(e) => { handleSubmit(e) }}>
                                <img src="https://cdn-icons-png.flaticon.com/512/954/954591.png" alt="https://cdn-icons-png.flaticon.com/512/2989/2989907.png" />
                            </button>
                        </form>
                    </div>
                    <div className={dark ? "card" : "card cardDark"}>
                        <div className="icon-arrange">
                            <div className={`${ic !== 'Clear' ? "temperature" : ""}`}><img src={icon} alt={def} /></div>
                            <div className="icon--number">
                                <div className="city">
                                    <h3>{data.name}, {data.sys.country}</h3>
                                    <h6 className="date">{dateBuilder(new Date())}</h6>
                                </div>
                            </div>
                        </div>
                        <div className="temp">
                            <p className={dark ? "bold" : "bold gold"}>{parseInt(data.main.temp)}</p> &nbsp;
                            <div className="celcius">
                                <h4>&#176;C</h4>
                            </div>
                        </div>
                        <h4 className="desc">{data.weather[0].description}</h4>
                        <div className="bottom">
                            <div className={dark ? "bottom--details" : "bottom--details"}>
                                <div className="icon--bottom"><p><img src="https://cdn-icons-png.flaticon.com/128/709/709612.png" alt="avatar" />&nbsp;&nbsp;&nbsp; Visibility &nbsp;<span>{parseInt(data.visibility / 1000)}km </span></p></div>
                                <p><img src="https://cdn-icons-png.flaticon.com/128/4158/4158502.png" alt="avatar" />&nbsp;&nbsp;&nbsp; Feels Like &nbsp;<span>{parseInt(data.main.feels_like)}&#176;C</span></p>
                            </div>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div className={dark ? "bottom--details" : "bottom--details"}>
                                <p><img src="https://img.icons8.com/ios/344/humidity.png" alt="avatar" />&nbsp;&nbsp;&nbsp; Humidity &nbsp;<span>{data.main.humidity}%</span></p>
                                <p><img src="https://static.thenounproject.com/png/927231-200.png" alt="avatar" />&nbsp;&nbsp;&nbsp; Wind Speed &nbsp;<span>{data.wind.speed}m/s</span></p>
                            </div>
                        </div>

                    </div>

                </div>
                <div className="mausam"><h1 className={`${!dark ? "white-color" : ""}`}>{windowSize.innerHeight < 534 ? "" : "mawesome"}</h1></div>
            </div>
        </>
    )
}
