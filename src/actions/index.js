import axios from 'axios';
import {
    TRACKS_LOADED,
    FAILED_TO_LOAD,
    SET_GOOGLE_CREDENTIALS
} from '../constants/action-types';

const StaticTracks = [{
        "name": "Used Me",
        "id": "1VTENXdyQ8NclpQcpscrQjcjMrXKkX52G",
        "url": "https://www.last.fm/music/The+Spin+Wires/_/Used+Me",
        "duration": "306000",
        "streamable": {
            "#text": "0",
            "fulltrack": "0"
        },
        "listeners": "45",
        "playcount": "216",
        "artist": {
            "name": "The Spin Wires",
            "url": "https://www.last.fm/music/The+Spin+Wires"
        },
        "album": {
            "artist": "The Spin Wires",
            "title": "The Spin Wires",
            "url": "https://www.last.fm/music/The+Spin+Wires/The+Spin+Wires",
            "image": [
                {
                    "#text": "https://lastfm-img2.akamaized.net/i/u/34s/1379c42585c9765db7eaf4fda718f1df.png",
                    "size": "small"
                },
                {
                    "#text": "https://lastfm-img2.akamaized.net/i/u/64s/1379c42585c9765db7eaf4fda718f1df.png",
                    "size": "medium"
                },
                {
                    "#text": "https://lastfm-img2.akamaized.net/i/u/174s/1379c42585c9765db7eaf4fda718f1df.png",
                    "size": "large"
                },
                {
                    "#text": "https://lastfm-img2.akamaized.net/i/u/300x300/1379c42585c9765db7eaf4fda718f1df.png",
                    "size": "extralarge"
                }
            ]
        },
        "toptags": {
            "tag": [
                {
                    "name": "alternative rock",
                    "url": "https://www.last.fm/tag/alternative+rock"
                },
                {
                    "name": "indie rock",
                    "url": "https://www.last.fm/tag/indie+rock"
                }
            ]
        }
    },
    {
        "name": "Should I Dance or Should I Die",
        "id": "1JZyeXnz1LKHFHr6n8lT4mqeP6j8SYeo3",
        "url": "https://www.last.fm/music/The+Spin+Wires/_/Should+I+Dance+or+Should+I+Die",
        "duration": "163000",
        "streamable": {
            "#text": "0",
            "fulltrack": "0"
        },
        "listeners": "64",
        "playcount": "284",
        "artist": {
            "name": "The Spin Wires",
            "url": "https://www.last.fm/music/The+Spin+Wires"
        },
        "album": {
            "artist": "The Spin Wires",
            "title": "The Spin Wires",
            "url": "https://www.last.fm/music/The+Spin+Wires/The+Spin+Wires",
            "image": [
                {
                    "#text": "https://lastfm-img2.akamaized.net/i/u/34s/1379c42585c9765db7eaf4fda718f1df.png",
                    "size": "small"
                },
                {
                    "#text": "https://lastfm-img2.akamaized.net/i/u/64s/1379c42585c9765db7eaf4fda718f1df.png",
                    "size": "medium"
                },
                {
                    "#text": "https://lastfm-img2.akamaized.net/i/u/174s/1379c42585c9765db7eaf4fda718f1df.png",
                    "size": "large"
                },
                {
                    "#text": "https://lastfm-img2.akamaized.net/i/u/300x300/1379c42585c9765db7eaf4fda718f1df.png",
                    "size": "extralarge"
                }
            ]
        },
        "toptags": {
            "tag": []
        }
    },
    {
        "name": "No Ones Keeping Score",
        "id": "1FzWjEDsSJZmVZkvRmt9B94lODpEEfRx1",
        "url": "https://www.last.fm/music/The+Spin+Wires/_/No+Ones+Keeping+Score",
        "duration": "171000",
        "streamable": {
            "#text": "0",
            "fulltrack": "0"
        },
        "listeners": "8",
        "playcount": "149",
        "artist": {
            "name": "The Spin Wires",
            "url": "https://www.last.fm/music/The+Spin+Wires"
        },
        "toptags": {
            "tag": []
        }
    },
    {
        "name": "Ignite",
        "id": "12-VdODwjWZt1d08p1V5bZ2kwc8nTF7f_",
        "url": "https://www.last.fm/music/The+Spin+Wires/_/Ignite",
        "duration": "141000",
        "streamable": {
            "#text": "0",
            "fulltrack": "0"
        },
        "listeners": "266",
        "playcount": "666",
        "artist": {
            "name": "The Spin Wires",
            "url": "https://www.last.fm/music/The+Spin+Wires"
        },
        "album": {
            "artist": "The Spin Wires",
            "title": "The Spin Wires",
            "url": "https://www.last.fm/music/The+Spin+Wires/The+Spin+Wires",
            "image": [
                {
                    "#text": "https://lastfm-img2.akamaized.net/i/u/34s/1379c42585c9765db7eaf4fda718f1df.png",
                    "size": "small"
                },
                {
                    "#text": "https://lastfm-img2.akamaized.net/i/u/64s/1379c42585c9765db7eaf4fda718f1df.png",
                    "size": "medium"
                },
                {
                    "#text": "https://lastfm-img2.akamaized.net/i/u/174s/1379c42585c9765db7eaf4fda718f1df.png",
                    "size": "large"
                },
                {
                    "#text": "https://lastfm-img2.akamaized.net/i/u/300x300/1379c42585c9765db7eaf4fda718f1df.png",
                    "size": "extralarge"
                }
            ]
        },
        "toptags": {
            "tag": [
                {
                    "name": "dance punk",
                    "url": "https://www.last.fm/tag/dance+punk"
                }
            ]
        }
    },
    {
        "name": "Girls Like You",
        "id": "1Es4mrb57YunJCouqpv3kbUMftte1yLTa",
        "url": "https://www.last.fm/music/The+Spin+Wires/_/Girls+Like+You",
        "duration": "198000",
        "streamable": {
            "#text": "0",
            "fulltrack": "0"
        },
        "listeners": "132",
        "playcount": "540",
        "artist": {
            "name": "The Spin Wires",
            "url": "https://www.last.fm/music/The+Spin+Wires"
        },
        "album": {
            "artist": "The Spin Wires",
            "title": "The Spin Wires",
            "url": "https://www.last.fm/music/The+Spin+Wires/The+Spin+Wires",
            "image": [
                {
                    "#text": "https://lastfm-img2.akamaized.net/i/u/34s/1379c42585c9765db7eaf4fda718f1df.png",
                    "size": "small"
                },
                {
                    "#text": "https://lastfm-img2.akamaized.net/i/u/64s/1379c42585c9765db7eaf4fda718f1df.png",
                    "size": "medium"
                },
                {
                    "#text": "https://lastfm-img2.akamaized.net/i/u/174s/1379c42585c9765db7eaf4fda718f1df.png",
                    "size": "large"
                },
                {
                    "#text": "https://lastfm-img2.akamaized.net/i/u/300x300/1379c42585c9765db7eaf4fda718f1df.png",
                    "size": "extralarge"
                }
            ]
        },
        "toptags": {
            "tag": [
                {
                    "name": "Post punk",
                    "url": "https://www.last.fm/tag/Post+punk"
                },
                {
                    "name": "arctic monkeys",
                    "url": "https://www.last.fm/tag/arctic+monkeys"
                },
                {
                    "name": "dance rock",
                    "url": "https://www.last.fm/tag/dance+rock"
                },
                {
                    "name": "Buffalo",
                    "url": "https://www.last.fm/tag/Buffalo"
                },
                {
                    "name": "electric six",
                    "url": "https://www.last.fm/tag/electric+six"
                }
            ]
        }
    },
    {
        "name": "Drunk With You",
        "id": "15kQGgfxlIqUxAwvzdSzNCk_4MES1bcnu",
        "url": "https://www.last.fm/music/The+Spin+Wires/_/Drunk+With+You",
        "duration": "166000",
        "streamable": {
            "#text": "0",
            "fulltrack": "0"
        },
        "listeners": "17",
        "playcount": "170",
        "artist": {
            "name": "The Spin Wires",
            "url": "https://www.last.fm/music/The+Spin+Wires"
        },
        "album": {
            "artist": "The Spin Wires",
            "title": "You Better Run - ZRUN Theme",
            "url": "https://www.last.fm/music/The+Spin+Wires/You+Better+Run+-+ZRUN+Theme",
            "image": [
                {
                    "#text": "",
                    "size": "small"
                },
                {
                    "#text": "",
                    "size": "medium"
                },
                {
                    "#text": "",
                    "size": "large"
                },
                {
                    "#text": "",
                    "size": "extralarge"
                }
            ]
        },
        "toptags": {
            "tag": []
        }
    },
    {
        "name": "Arent You Worried",
        "id": "1GA_VYquPR35DF286H-tCFfoFDhEoFk12",
        "url": "https://www.last.fm/music/The+Spin+Wires/_/Arent+You+Worried",
        "duration": "0",
        "streamable": {
            "#text": "0",
            "fulltrack": "0"
        },
        "listeners": "7",
        "playcount": "114",
        "artist": {
            "name": "The Spin Wires",
            "url": "https://www.last.fm/music/The+Spin+Wires"
        },
        "toptags": {
            "tag": []
        }
    }
]

export function getTracks() {
    return function getTracksImpl(dispatch) {
        dispatch({
            type: TRACKS_LOADED,
            payload: StaticTracks
        });
        // axios.get('http://localhost:8080/api/tracks', {
        //     params: {},
        //     // headers: {
        //     //     google_token: token
        //     // }
        // }).then((response) => {
        //     dispatch({
        //         type: TRACKS_LOADED,
        //         payload: response.data.tracks
        //     });
        // }).catch((err) => {
        //     dispatch({
        //         type: FAILED_TO_LOAD,
        //         payload: err.msg
        //     });
        // });
    };
}


export function setGoogleCredentials(payload) {
    return { type: SET_GOOGLE_CREDENTIALS, payload };
}
