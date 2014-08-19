// SAMPLE
this.manifest = {
    "name": "CallMiner API Extension",
    "icon": "icon.png",
    "settings": [
        {
            "tab": "Information",
            "group": "Login",
            "name": "username",
            "type": "text",
            "label": "Username",
            "text": "enter username here"
        },
        {
            "tab": "Information",
            "group": "Login",
            "name": "password",
            "type": "text",
            "label": "Password",
            "text": "enter password here",
            "masked": true
        },
		{
            "tab": "Information",
            "group": "Login",
            "name": "apikey",
            "type": "text",
            "label": "API Key",
            "text": "enter api key here",
            "masked": true
        },
        {
            "tab": "Information",
            "group": "LogOut",
            "name": "myCheckbox",
            "type": "checkbox",
            "label": "Enable"
        },
        {
            "tab": "Information",
            "group": "LogOut",
            "name": "myButton",
            "type": "button",
            "label": "Disconnect",
            "text": "LogOut"
        }
    ],
    "alignment": [
        [
            "username",
            "password",
			"apikey"
        ]
    ]
};
