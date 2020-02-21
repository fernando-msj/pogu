function init(userLibs = [], channelLibs = [], callback) {
    const scale = '1x';
    const emoteLibrary = {};
    let emoteKeys = [];
    let emotesRegexes = [];
    let allEmoteRegex = /.*/;

    const originalImplementation = window.console.log;


    const allPromises = [];

    const ALL = {};

    userLibs.forEach(libURL => {
        window.fetch(libURL)
            .then(betterTTVResponse => betterTTVResponse.json())
            .then(emotesObject =>
                emotesObject.forEach(curr => {
                    const img = new Image();

                    ALL[curr.code] = {
                        width: 0,
                        height: 0,
                        src: curr.images[scale],
                    };

                    const currentObj = ALL[curr.code];

                    img.src = curr.images[scale];

                    allPromises.push(new Promise(res => {
                        img.onload = function () {
                            currentObj.width = this.width;
                            currentObj.height = this.height;
                            res();
                        };
                    }))
                }, {})
            ).then(() => {
                channelLibs.forEach(libURL => {
                    window.fetch(libURL)
                        .then(betterTTVResponse => betterTTVResponse.json())
                        .then(({ channelEmotes = [], sharedEmotes = [] }) => {
                            const allEmotes = [...channelEmotes, ...sharedEmotes].map(({ code, id }) => ({
                                code,
                                url: `https://cdn.betterttv.net/emote/${id}/${scale}`
                            }))

                            allEmotes.forEach(curr => {
                                const img = new Image();
                                ALL[curr.code] = {
                                    width: 0,
                                    height: 0,
                                    src: curr.url,
                                };

                                const currentObj = ALL[curr.code];

                                img.src = curr.url;

                                allPromises.push(new Promise(res => {
                                    img.onload = function () {
                                        currentObj.width = this.width;
                                        currentObj.height = this.height;
                                        res();
                                    };
                                }))
                            }, {})

                        }).then(() => {
                            Promise.all(allPromises).then(() => {
                                debugger;
                                Object.assign(emoteLibrary, ALL);
                                emoteKeys = Object.keys(emoteLibrary);
                                emotesRegexes = emoteKeys.map(key => new RegExp(`\\b${key}\\b`, 'g'))
                                allEmoteRegex = new RegExp(emoteKeys.map(x => `\\b${x}\\b`).join('|'), 'g')

                                callback();
                            })
                        })

                });




            })
    });

















    console.logU = (...argsArray) => {

        const copy = [...argsArray];

        for (let index = 0; index < argsArray.length; index++) {
            const element = argsArray[index];
            if (typeof element === 'string') {

                let occurrences = [];
                emotesRegexes.forEach(regex => {
                    const oc = element.match(regex);
                    if (oc) {
                        occurrences.push(...oc)
                    }
                });

                const result = occurrences.map(emoteKey => {
                    const {
                        height,
                        src } = emoteLibrary[emoteKey];

                    return `background: url(${src}); line-height: ${height}px; background-repeat: no-repeat; font-size: 2px`
                });


                const insertPos = index + 1;
                if (insertPos > copy.length) {
                    copy.push(...result)
                } else {
                    copy.splice(insertPos, 0, ...result);
                }

                const newString = element.replace(allEmoteRegex, emoteKey => {
                    const { width } = emoteLibrary[emoteKey];
                    return `%c${' '.repeat(width)}`;
                })


                copy.splice(index, 1, newString)
            }

        }
        originalImplementation.apply(null, copy)

    };
}

init(['https://api.betterttv.net/3/cached/frankerfacez/users/twitch/71092938'], ['https://api.betterttv.net/3/cached/users/twitch/71092938'])