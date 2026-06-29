[
    {
        "id": "dd002821fcc9f65a",
        "type": "tab",
        "label": "Flow 1",
        "disabled": false,
        "info": "",
        "env": []
    },
    {
        "id": "29e3ba226aafb13c",
        "type": "mqtt in",
        "z": "dd002821fcc9f65a",
        "name": "MQTT Lux Externa",
        "topic": "romulo_e_samuel/luminosidade-externa",
        "qos": "2",
        "datatype": "auto-detect",
        "broker": "3aba9510429dc5a7",
        "nl": false,
        "rap": true,
        "rh": 0,
        "inputs": 0,
        "x": 250,
        "y": 160,
        "wires": [
            [
                "ed8bebf1e0e0aff1",
                "dfd7c957619903c9"
            ]
        ]
    },
    {
        "id": "1bc1cea7095242e7",
        "type": "mqtt in",
        "z": "dd002821fcc9f65a",
        "name": "MQTT Lux Interna",
        "topic": "romulo_e_samuel/luminosidade-interna",
        "qos": "2",
        "datatype": "auto-detect",
        "broker": "3aba9510429dc5a7",
        "nl": false,
        "rap": true,
        "rh": 0,
        "inputs": 0,
        "x": 250,
        "y": 220,
        "wires": [
            [
                "ed8bebf1e0e0aff1",
                "84406ad272151570"
            ]
        ]
    },
    {
        "id": "148a5c96372dcace",
        "type": "mqtt in",
        "z": "dd002821fcc9f65a",
        "name": "MQTT Umidade",
        "topic": "romulo_e_samuel/umidade",
        "qos": "2",
        "datatype": "auto-detect",
        "broker": "3aba9510429dc5a7",
        "nl": false,
        "rap": true,
        "rh": 0,
        "inputs": 0,
        "x": 230,
        "y": 340,
        "wires": [
            [
                "ed8bebf1e0e0aff1",
                "8fcdc7f65b66ec16"
            ]
        ]
    },
    {
        "id": "dc76c34db893c15b",
        "type": "mqtt in",
        "z": "dd002821fcc9f65a",
        "name": "MQTT Temperatura",
        "topic": "romulo_e_samuel/temperatura",
        "qos": "2",
        "datatype": "auto-detect",
        "broker": "3aba9510429dc5a7",
        "nl": false,
        "rap": true,
        "rh": 0,
        "inputs": 0,
        "x": 250,
        "y": 300,
        "wires": [
            [
                "ed8bebf1e0e0aff1",
                "ae5b34b3b1219cca"
            ]
        ]
    },
    {
        "id": "259ca7d43b46afb1",
        "type": "mqtt in",
        "z": "dd002821fcc9f65a",
        "name": "",
        "topic": "romulo_e_samuel/cortina",
        "qos": "2",
        "datatype": "auto-detect",
        "broker": "3aba9510429dc5a7",
        "nl": false,
        "rap": true,
        "rh": 0,
        "inputs": 0,
        "x": 230,
        "y": 460,
        "wires": [
            [
                "ed8bebf1e0e0aff1",
                "8194b07fb734fe4b"
            ]
        ]
    },
    {
        "id": "bbc04656745cc850",
        "type": "mqtt in",
        "z": "dd002821fcc9f65a",
        "name": "",
        "topic": "romulo_e_samuel/cooler",
        "qos": "2",
        "datatype": "auto-detect",
        "broker": "3aba9510429dc5a7",
        "nl": false,
        "rap": true,
        "rh": 0,
        "inputs": 0,
        "x": 230,
        "y": 540,
        "wires": [
            [
                "ed8bebf1e0e0aff1",
                "e2b623893a3641d0"
            ]
        ]
    },
    {
        "id": "ed8bebf1e0e0aff1",
        "type": "debug",
        "z": "dd002821fcc9f65a",
        "name": "debug MQTT",
        "active": true,
        "tosidebar": true,
        "console": true,
        "tostatus": true,
        "complete": "payload",
        "targetType": "msg",
        "statusVal": "payload",
        "statusType": "auto",
        "x": 660,
        "y": 40,
        "wires": []
    },
    {
        "id": "ae5b34b3b1219cca",
        "type": "ui-gauge",
        "z": "dd002821fcc9f65a",
        "name": "Temperatura",
        "group": "61af6c45fd141680",
        "order": 1,
        "value": "payload",
        "valueType": "msg",
        "width": 3,
        "height": 3,
        "gtype": "gauge-half",
        "gstyle": "needle",
        "title": "Temperatura",
        "alwaysShowTitle": false,
        "floatingTitlePosition": "top-left",
        "units": "°C",
        "icon": "",
        "prefix": "",
        "suffix": "",
        "segments": [
            {
                "from": "0",
                "color": "#4caf50",
                "text": "",
                "textType": "label"
            }
        ],
        "min": 0,
        "max": "50",
        "sizeThickness": 16,
        "sizeGap": 4,
        "sizeKeyThickness": 8,
        "styleRounded": true,
        "styleGlow": false,
        "className": "",
        "x": 950,
        "y": 280,
        "wires": [
            []
        ]
    },
    {
        "id": "84406ad272151570",
        "type": "ui-gauge",
        "z": "dd002821fcc9f65a",
        "name": "Luminosidade Interna",
        "group": "61af6c45fd141680",
        "order": 3,
        "value": "payload",
        "valueType": "msg",
        "width": 3,
        "height": 3,
        "gtype": "gauge-half",
        "gstyle": "needle",
        "title": "Luminosidade Interna",
        "alwaysShowTitle": false,
        "floatingTitlePosition": "top-left",
        "units": "",
        "icon": "",
        "prefix": "",
        "suffix": "",
        "segments": [
            {
                "from": "0",
                "color": "#4caf50",
                "text": "",
                "textType": "label"
            }
        ],
        "min": 0,
        "max": "255",
        "sizeThickness": 16,
        "sizeGap": 4,
        "sizeKeyThickness": 8,
        "styleRounded": true,
        "styleGlow": false,
        "className": "",
        "x": 760,
        "y": 220,
        "wires": [
            []
        ]
    },
    {
        "id": "8fcdc7f65b66ec16",
        "type": "ui-gauge",
        "z": "dd002821fcc9f65a",
        "name": "Umidade",
        "group": "61af6c45fd141680",
        "order": 2,
        "value": "payload",
        "valueType": "msg",
        "width": 3,
        "height": 3,
        "gtype": "gauge-half",
        "gstyle": "needle",
        "title": "Umidade",
        "alwaysShowTitle": false,
        "floatingTitlePosition": "top-left",
        "units": "%",
        "icon": "",
        "prefix": "",
        "suffix": "",
        "segments": [
            {
                "from": "0",
                "color": "#2196f3",
                "text": "",
                "textType": "label"
            }
        ],
        "min": 0,
        "max": "100",
        "sizeThickness": 16,
        "sizeGap": 4,
        "sizeKeyThickness": 8,
        "styleRounded": true,
        "styleGlow": false,
        "className": "",
        "x": 740,
        "y": 380,
        "wires": [
            []
        ]
    },
    {
        "id": "15a5ba302ca002f1",
        "type": "ui-form",
        "z": "dd002821fcc9f65a",
        "name": "Formulario de limiares",
        "group": "840109b6fbf1c21f",
        "label": "Limiares",
        "order": 1,
        "width": 0,
        "height": 0,
        "options": [
            {
                "label": "Temperatura Maxima",
                "key": "temp_max",
                "type": "number",
                "required": false,
                "rows": null
            },
            {
                "label": "Luminosidade Maxima",
                "key": "luz_max",
                "type": "number",
                "required": false,
                "rows": null
            },
            {
                "label": "Umidade Minima",
                "key": "umi_min",
                "type": "number",
                "required": false,
                "rows": null
            }
        ],
        "formValue": {
            "temp_max": "",
            "luz_max": "",
            "umi_min": ""
        },
        "payload": "",
        "submit": "Enviar",
        "cancel": "Limpar",
        "resetOnSubmit": false,
        "topic": "topic",
        "topicType": "msg",
        "splitLayout": "",
        "className": "",
        "passthru": false,
        "dropdownOptions": [],
        "x": 520,
        "y": 900,
        "wires": [
            [
                "4f4c981d65672e7b"
            ]
        ]
    },
    {
        "id": "e2b623893a3641d0",
        "type": "ui-text",
        "z": "dd002821fcc9f65a",
        "group": "dea80e4a15dd75e6",
        "order": 2,
        "width": 0,
        "height": 0,
        "name": "Status Cooler",
        "label": "Cooler",
        "format": "{{msg.payload}}",
        "layout": "row-spread",
        "style": false,
        "font": "",
        "fontSize": 16,
        "color": "#717171",
        "wrapText": false,
        "className": "",
        "value": "payload",
        "valueType": "msg",
        "x": 660,
        "y": 560,
        "wires": []
    },
    {
        "id": "abca0fe3f1b6f88c",
        "type": "ui-text",
        "z": "dd002821fcc9f65a",
        "group": "dea80e4a15dd75e6",
        "order": 1,
        "width": 0,
        "height": 0,
        "name": "Status Cortina",
        "label": "Cortina",
        "format": "{{msg.payload}}",
        "layout": "row-spread",
        "style": false,
        "font": "",
        "fontSize": 16,
        "color": "#717171",
        "wrapText": false,
        "className": "",
        "value": "payload",
        "valueType": "msg",
        "x": 900,
        "y": 460,
        "wires": []
    },
    {
        "id": "8194b07fb734fe4b",
        "type": "function",
        "z": "dd002821fcc9f65a",
        "name": "ParserStatusCortina",
        "func": "let angulo = msg.payload;\nlet status = \"\";\n\nif (angulo === 0) {\n    status = \" (ABERTO)\";\n} else if (angulo === 90){\n    status = \" (FECHADO)\"\n}\nmsg.payload = `${angulo}${status}`\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 620,
        "y": 460,
        "wires": [
            [
                "abca0fe3f1b6f88c"
            ]
        ]
    },
    {
        "id": "b34c09c91d51bab7",
        "type": "ui-switch",
        "z": "dd002821fcc9f65a",
        "name": "Controle cooler",
        "label": "Switch Cooler",
        "group": "92ca39749a9e6e12",
        "order": 1,
        "width": 0,
        "height": 0,
        "passthru": false,
        "decouple": false,
        "topic": "topic",
        "topicType": "msg",
        "style": "",
        "className": "",
        "layout": "row-spread",
        "clickableArea": "switch",
        "onvalue": "true",
        "onvalueType": "bool",
        "onicon": "",
        "oncolor": "",
        "offvalue": "false",
        "offvalueType": "bool",
        "officon": "",
        "offcolor": "",
        "x": 1520,
        "y": 1100,
        "wires": [
            [
                "5402247044d243d4"
            ]
        ]
    },
    {
        "id": "8776ed98ddc8334f",
        "type": "ui-switch",
        "z": "dd002821fcc9f65a",
        "name": "Modo Manual",
        "label": "Modo Manual",
        "group": "92ca39749a9e6e12",
        "order": 3,
        "width": 0,
        "height": 0,
        "passthru": false,
        "decouple": false,
        "topic": "topic",
        "topicType": "msg",
        "style": "",
        "className": "",
        "layout": "row-spread",
        "clickableArea": "switch",
        "onvalue": "true",
        "onvalueType": "bool",
        "onicon": "",
        "oncolor": "",
        "offvalue": "false",
        "offvalueType": "bool",
        "officon": "",
        "offcolor": "",
        "x": 1300,
        "y": 1020,
        "wires": [
            [
                "7693f62ecce93ec6"
            ]
        ]
    },
    {
        "id": "d67f12746d545216",
        "type": "ui-slider",
        "z": "dd002821fcc9f65a",
        "group": "92ca39749a9e6e12",
        "name": "Slider Cortina",
        "label": "Angulacao",
        "tooltip": "",
        "order": 2,
        "width": 0,
        "height": 0,
        "passthru": false,
        "outs": "all",
        "topic": "topic",
        "topicType": "msg",
        "thumbLabel": "true",
        "showTicks": "always",
        "min": 0,
        "max": "90",
        "step": 1,
        "className": "",
        "iconPrepend": "",
        "iconAppend": "",
        "color": "",
        "colorTrack": "",
        "colorThumb": "",
        "showTextField": false,
        "x": 1360,
        "y": 1200,
        "wires": [
            [
                "9c34836325b53f7c"
            ]
        ]
    },
    {
        "id": "7693f62ecce93ec6",
        "type": "change",
        "z": "dd002821fcc9f65a",
        "name": "MensagemManual",
        "rules": [
            {
                "t": "set",
                "p": "topic",
                "pt": "msg",
                "to": "romulo_e_samuel/config/modo",
                "tot": "str"
            },
            {
                "t": "set",
                "p": "ui_control.disabled",
                "pt": "msg",
                "to": "not(payload)",
                "tot": "jsonata"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 1170,
        "y": 1100,
        "wires": [
            [
                "b34c09c91d51bab7",
                "d67f12746d545216",
                "b4fc2379635abbfe"
            ]
        ]
    },
    {
        "id": "4f4c981d65672e7b",
        "type": "function",
        "z": "dd002821fcc9f65a",
        "name": "ParserFormularioLimiares",
        "func": "const dados = msg.payload;\n\nconst msgTemp = { payload: dados.temp_max, topic: \"romulo_e_samuel/config/temp_max\" };\nconst msgUmi  = { payload: dados.umi_min,  topic: \"romulo_e_samuel/config/umi_min\" };\nconst msgLuz  = { payload: dados.luz_max,  topic: \"romulo_e_samuel/config/luz_max\" };\n\nreturn [ [msgTemp, msgUmi, msgLuz] ];",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 850,
        "y": 920,
        "wires": [
            [
                "b4fc2379635abbfe"
            ]
        ]
    },
    {
        "id": "b4fc2379635abbfe",
        "type": "mqtt out",
        "z": "dd002821fcc9f65a",
        "name": "Publicador",
        "topic": "",
        "qos": "",
        "retain": "",
        "respTopic": "",
        "contentType": "",
        "userProps": "",
        "correl": "",
        "expiry": "",
        "broker": "3aba9510429dc5a7",
        "x": 1230,
        "y": 1420,
        "wires": []
    },
    {
        "id": "5402247044d243d4",
        "type": "change",
        "z": "dd002821fcc9f65a",
        "name": "ParserCmdCooler",
        "rules": [
            {
                "t": "set",
                "p": "topic",
                "pt": "msg",
                "to": "romulo_e_samuel/cmd/cooler",
                "tot": "str"
            },
            {
                "t": "set",
                "p": "payload",
                "pt": "msg",
                "to": "payload ? 1 : 0",
                "tot": "jsonata"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 1630,
        "y": 1220,
        "wires": [
            [
                "b4fc2379635abbfe"
            ]
        ]
    },
    {
        "id": "9c34836325b53f7c",
        "type": "change",
        "z": "dd002821fcc9f65a",
        "name": "ParserCmdCortina",
        "rules": [
            {
                "t": "set",
                "p": "topic",
                "pt": "msg",
                "to": "romulo_e_samuel/cmd/cortina",
                "tot": "str"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 1450,
        "y": 1260,
        "wires": [
            [
                "b4fc2379635abbfe"
            ]
        ]
    },
    {
        "id": "03b943603b718861",
        "type": "function",
        "z": "dd002821fcc9f65a",
        "name": "ParserLimiarTemp",
        "func": "const tempMaxConfirmada = parseFloat(msg.payload);\n\n// Validação de segurança\nif (isNaN(tempMaxConfirmada)) {\n    node.error(\"Parser recebeu um valor inválido: \" + msg.payload);\n    return null;\n}\n\n// Criamos o objeto cobrindo todo o range (de 0 a 50)\nconst novaMensagem = {\n    ui_update: {\n        \"min\": 0,\n        \"max\": 50,\n        \"segments\": [\n            { \"from\": 0, \"color\": \"#4caf50\" },\n            { \"from\": tempMaxConfirmada, \"color\": \"#f44336\" }\n        ]\n    }\n};\n\nreturn novaMensagem;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1370,
        "y": 60,
        "wires": [
            [
                "2b55edb23ca740b4",
                "ae5b34b3b1219cca"
            ]
        ]
    },
    {
        "id": "9738e7944c90370f",
        "type": "mqtt in",
        "z": "dd002821fcc9f65a",
        "name": "Confirma Temp",
        "topic": "romulo_e_samuel/confirmacao/temp_max",
        "qos": "2",
        "datatype": "auto-detect",
        "broker": "3aba9510429dc5a7",
        "nl": false,
        "rap": true,
        "rh": 0,
        "inputs": 0,
        "x": 1120,
        "y": 100,
        "wires": [
            [
                "03b943603b718861"
            ]
        ]
    },
    {
        "id": "1849a95498311631",
        "type": "mqtt in",
        "z": "dd002821fcc9f65a",
        "name": "Confirma Umi",
        "topic": "romulo_e_samuel/confirmacao/umi_min",
        "qos": "2",
        "datatype": "auto-detect",
        "broker": "3aba9510429dc5a7",
        "nl": false,
        "rap": true,
        "rh": 0,
        "inputs": 0,
        "x": 1370,
        "y": 140,
        "wires": [
            [
                "093daf5cc83772b1"
            ]
        ]
    },
    {
        "id": "07aed5773e200ae3",
        "type": "mqtt in",
        "z": "dd002821fcc9f65a",
        "name": "Confirma Luz",
        "topic": "romulo_e_samuel/confirmacao/luz_max",
        "qos": "2",
        "datatype": "auto-detect",
        "broker": "3aba9510429dc5a7",
        "nl": false,
        "rap": true,
        "rh": 0,
        "inputs": 0,
        "x": 1190,
        "y": 360,
        "wires": [
            [
                "e2e41e941574ab3a"
            ]
        ]
    },
    {
        "id": "093daf5cc83772b1",
        "type": "function",
        "z": "dd002821fcc9f65a",
        "name": "ParserLimiarUmi",
        "func": "const umiMinConfirmada = parseFloat(msg.payload);\n\n// Validação de segurança\nif (isNaN(umiMinConfirmada)) {\n    node.error(\"Parser recebeu um valor inválido: \" + msg.payload);\n    return null;\n}\n\n// Criamos o objeto cobrindo todo o range (de 0 a 50)\nconst novaMensagem = {\n    ui_update: {\n        \"min\": 0,\n        \"max\": 100,\n        \"segments\": [\n            { \"from\": 0, \"color\": \"#f44336\" },\n            { \"from\": umiMinConfirmada, \"color\": \"#4caf50\"}\n        ]\n    }\n};\n\nreturn novaMensagem;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1570,
        "y": 140,
        "wires": [
            [
                "8fcdc7f65b66ec16"
            ]
        ]
    },
    {
        "id": "e2e41e941574ab3a",
        "type": "function",
        "z": "dd002821fcc9f65a",
        "name": "ParserLimiarLuz",
        "func": "const luzMaxConfirmada = parseFloat(msg.payload);\nif (isNaN(luzMaxConfirmada)) return null;\n\nconst novaMensagem = {\n    ui_control: {\n        \"min\": 0,\n        \"max\": 255,\n        \"segments\": [\n            { \"from\": 0, \"color\": \"#4caf50\" },      \n            { \"from\": luzMaxConfirmada, \"color\": \"#f44336\" }\n        ]\n    }\n};\nreturn novaMensagem;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1380,
        "y": 360,
        "wires": [
            [
                "dfd7c957619903c9"
            ]
        ]
    },
    {
        "id": "dfd7c957619903c9",
        "type": "ui-gauge",
        "z": "dd002821fcc9f65a",
        "name": "Luminosidade Externa",
        "group": "61af6c45fd141680",
        "order": 4,
        "value": "payload",
        "valueType": "msg",
        "width": 3,
        "height": 3,
        "gtype": "gauge-half",
        "gstyle": "needle",
        "title": "Luminosidade Externa",
        "alwaysShowTitle": false,
        "floatingTitlePosition": "top-left",
        "units": "",
        "icon": "",
        "prefix": "",
        "suffix": "",
        "segments": [
            {
                "from": "0",
                "color": "#4caf50",
                "text": "",
                "textType": "label"
            }
        ],
        "min": 0,
        "max": "255",
        "sizeThickness": 16,
        "sizeGap": 4,
        "sizeKeyThickness": 8,
        "styleRounded": true,
        "styleGlow": false,
        "className": "",
        "x": 720,
        "y": 120,
        "wires": [
            []
        ]
    },
    {
        "id": "dda939f63f38eb45",
        "type": "inject",
        "z": "dd002821fcc9f65a",
        "name": "MockLuzInterna",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "100",
        "payloadType": "num",
        "x": 420,
        "y": 40,
        "wires": [
            [
                "84406ad272151570"
            ]
        ]
    },
    {
        "id": "e576da9295c83e97",
        "type": "inject",
        "z": "dd002821fcc9f65a",
        "name": "MockLuzExterna",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "50",
        "payloadType": "num",
        "x": 200,
        "y": 40,
        "wires": [
            [
                "dfd7c957619903c9"
            ]
        ]
    },
    {
        "id": "1f6bd99a540961be",
        "type": "inject",
        "z": "dd002821fcc9f65a",
        "name": "MockTempAlta",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "30",
        "payloadType": "num",
        "x": 180,
        "y": 80,
        "wires": [
            [
                "ae5b34b3b1219cca"
            ]
        ]
    },
    {
        "id": "236f5b8c664bd226",
        "type": "inject",
        "z": "dd002821fcc9f65a",
        "name": "MockLimLuz",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "150",
        "payloadType": "num",
        "x": 1230,
        "y": 500,
        "wires": [
            [
                "e2e41e941574ab3a"
            ]
        ]
    },
    {
        "id": "d14d7d5f1d8880fa",
        "type": "inject",
        "z": "dd002821fcc9f65a",
        "name": "MockLimTemp",
        "props": [
            {
                "p": "payload"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "21.2",
        "payloadType": "num",
        "x": 970,
        "y": 60,
        "wires": [
            [
                "03b943603b718861",
                "6cd49bab0ab12050"
            ]
        ]
    },
    {
        "id": "8c35609317278309",
        "type": "inject",
        "z": "dd002821fcc9f65a",
        "name": "MockTempBaixa",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "20",
        "payloadType": "num",
        "x": 140,
        "y": 120,
        "wires": [
            [
                "ae5b34b3b1219cca"
            ]
        ]
    },
    {
        "id": "2b55edb23ca740b4",
        "type": "debug",
        "z": "dd002821fcc9f65a",
        "name": "debugParserLimiTemp",
        "active": true,
        "tosidebar": true,
        "console": true,
        "tostatus": true,
        "complete": "ui_control",
        "targetType": "msg",
        "statusVal": "payload",
        "statusType": "auto",
        "x": 1730,
        "y": 45.96154022216797,
        "wires": []
    },
    {
        "id": "6cd49bab0ab12050",
        "type": "debug",
        "z": "dd002821fcc9f65a",
        "name": "debugMock",
        "active": true,
        "tosidebar": true,
        "console": true,
        "tostatus": true,
        "complete": "payload",
        "targetType": "msg",
        "statusVal": "payload",
        "statusType": "auto",
        "x": 1140,
        "y": 20,
        "wires": []
    },
    {
        "id": "33ee7a916785a3d1",
        "type": "inject",
        "z": "dd002821fcc9f65a",
        "name": "MockLimUmi",
        "props": [
            {
                "p": "payload"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "50.1",
        "payloadType": "num",
        "x": 1150,
        "y": 220,
        "wires": [
            [
                "093daf5cc83772b1"
            ]
        ]
    },
    {
        "id": "3aba9510429dc5a7",
        "type": "mqtt-broker",
        "name": "sensores",
        "broker": "broker.emqx.io",
        "port": 1883,
        "clientid": "",
        "autoConnect": true,
        "usetls": false,
        "protocolVersion": 4,
        "keepalive": 60,
        "cleansession": true,
        "autoUnsubscribe": true,
        "birthTopic": "",
        "birthQos": "0",
        "birthRetain": "false",
        "birthPayload": "",
        "birthMsg": {},
        "closeTopic": "",
        "closeQos": "0",
        "closeRetain": "false",
        "closePayload": "",
        "closeMsg": {},
        "willTopic": "",
        "willQos": "0",
        "willRetain": "false",
        "willPayload": "",
        "willMsg": {},
        "userProps": "",
        "sessionExpiry": ""
    },
    {
        "id": "61af6c45fd141680",
        "type": "ui-group",
        "name": "Indicadores de ambiente",
        "page": "7e2919f8ac251370",
        "width": 6,
        "height": 1,
        "order": 1,
        "showTitle": true,
        "className": "",
        "visible": "true",
        "disabled": "false",
        "groupType": "default"
    },
    {
        "id": "840109b6fbf1c21f",
        "type": "ui-group",
        "name": "Editar Limiares",
        "page": "7e2919f8ac251370",
        "width": 6,
        "height": 1,
        "order": 2,
        "showTitle": true,
        "className": "",
        "visible": "true",
        "disabled": "false",
        "groupType": "default"
    },
    {
        "id": "dea80e4a15dd75e6",
        "type": "ui-group",
        "name": "Status dos atuadores",
        "page": "7e2919f8ac251370",
        "width": 6,
        "height": 1,
        "order": 4,
        "showTitle": true,
        "className": "",
        "visible": "true",
        "disabled": "false",
        "groupType": "default"
    },
    {
        "id": "92ca39749a9e6e12",
        "type": "ui-group",
        "name": "Controle manual",
        "page": "7e2919f8ac251370",
        "width": 6,
        "height": 1,
        "order": 3,
        "showTitle": true,
        "className": "",
        "visible": "true",
        "disabled": "false",
        "groupType": "default"
    },
    {
        "id": "7e2919f8ac251370",
        "type": "ui-page",
        "name": "Estufa",
        "ui": "126704c6a66171f0",
        "path": "/estufa",
        "icon": "home",
        "layout": "grid",
        "theme": "6ebf63e95bf9fb0c",
        "breakpoints": [
            {
                "name": "Default",
                "px": "0",
                "cols": "3"
            },
            {
                "name": "Tablet",
                "px": "576",
                "cols": "6"
            },
            {
                "name": "Small Desktop",
                "px": "768",
                "cols": "9"
            },
            {
                "name": "Desktop",
                "px": "1024",
                "cols": "12"
            }
        ],
        "order": 1,
        "className": "",
        "visible": true,
        "disabled": false
    },
    {
        "id": "126704c6a66171f0",
        "type": "ui-base",
        "name": "My Dashboard",
        "path": "/dashboard",
        "appIcon": "",
        "includeClientData": true,
        "acceptsClientConfig": [
            "ui-notification",
            "ui-control"
        ],
        "showPathInSidebar": false,
        "headerContent": "page",
        "navigationStyle": "default",
        "titleBarStyle": "default",
        "showReconnectNotification": true,
        "notificationDisplayTime": 1,
        "showDisconnectNotification": true,
        "allowInstall": false
    },
    {
        "id": "6ebf63e95bf9fb0c",
        "type": "ui-theme",
        "name": "Default Theme",
        "colors": {
            "surface": "#ffffff",
            "primary": "#0094CE",
            "bgPage": "#eeeeee",
            "groupBg": "#ffffff",
            "groupOutline": "#cccccc"
        },
        "sizes": {
            "density": "default",
            "pagePadding": "12px",
            "groupGap": "12px",
            "groupBorderRadius": "4px",
            "widgetGap": "12px"
        }
    },
    {
        "id": "f624671469a85e76",
        "type": "global-config",
        "env": [],
        "modules": {
            "@flowfuse/node-red-dashboard": "1.30.2"
        }
    }
]
