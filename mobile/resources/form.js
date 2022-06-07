// Copyright Nebula Services 2021 - Present
// All Rights Reserved

var option = localStorage.getItem('nogg');
var nogg = document.getElementById('nogg');

function toggleNoGG() {
    console.log(option);
    if (option === 'on') {
        nogg.style.color = '';
        option = 'off';
        localStorage.setItem('nogg', 'off');
    } else {
        nogg.style.color = 'green';
        option = 'on';
        localStorage.setItem('nogg', 'on');
    }
}

window.addEventListener('load', () => {
    if (localStorage.getItem('nogg') === 'on')
        nogg.style.color = 'green';

    function isUrl(val = '') {
        if (/^http(s?):\/\//.test(val) || val.includes('.') && val.substr(0, 1) !== ' ') return true;
        return false;
    };

    // NOGG
    const useNoGG = false;
    const form = document.querySelector('form');
    form.addEventListener('submit', event => {
        event.preventDefault();

        if (typeof navigator.serviceWorker === 'undefined')
            alert('Your browser does not support service workers or you are in private browsing!');
        console.log("Your Browser does not support ServiceWorkers and responded Undefined.")

        navigator.serviceWorker.register('./sw.js', {
            scope: __uv$config.prefix
        }).then(() => {
            const value = event.target.firstElementChild.value;

            let url = value.trim();
            if (!isUrl(url))
                url = 'https://www.google.com/search?q=' + url;
            else
            if (!(url.startsWith('https://') || url.startsWith('http://'))) url = 'http://' + url;
            const redirectTo = __uv$config.prefix + __uv$config.encodeUrl(url);
            const option = localStorage.getItem('nogg');
            if (option === 'on') {
                const nogg = window.open("about:blank", '_self', "popup");

                setTimeout(() => {
                    nogg.document.write(`
								<!DOCTYPE html>
								<style>
                body {
                  margin: 0;
                }
                iframe {
                  display: block;
                  border: none;
                  height: 100vh;
                  width: 100vw;
                }
.custom_menu {
    width: 100%;
    margin: 0 auto;
    text-align: center;
}
.custom_menu ul {
    margin: 0px;
    padding: 0px;
    display: inline-block;
}
.custom_menu li {
    float: left;
    font-size: 16px;
    color: #f1f1f1;
    padding-left: 100px;
    padding-right: 100px;
}
 ul, li, ol {
    margin: 0px;
    padding: 0px;
    list-style: none;
    color: white;
} 
ul {
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
    
}
li {
   color: white;
  font-family: "Helvetica";
  /* background-color: #210535; */
  padding: 10px;
  border-radius: 10px;
  text-decoration: none;
  transition: 0.5s;
}
a {
  color: white;
  font-family: "Helvetica";
  /* background-color: #210535; */
  padding: 10px;
  border-radius: 10px;
  text-decoration: none;
  transition: 0.5s;
}
a:hover {
  color: grey;
  transition: 0.5s;
  cursor: pointer;
}
.header_section_top {
  position: fixed;
    animation-name: fadein;
    animation-duration: 2s;
    width: 100%;
    float: left;
    background-color: rgb(90, 24, 154);
    clip-path: polygon(0 0, 100% 0, 96% 100%, 3% 100%);
    height: auto;
   padding: -25px 0px;
    color: white;
}
                </style>
                <head>
<title> Google Classroom </title> 
<link rel="icon" type="image/x-icon" href="data:image/jpeg;base64,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">
                      </head> 
                        <body> 
 
								<iframe sandbox=" allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-presentation allow-scripts allow-same-origin allow-popups" src=${redirectTo}>
</iframe>
      
</body> 
            `);
                }, 500);
            } else location.href = redirectTo;
        });
    });
});

function hide() {
    var x = document.getElementById("banner_bg_main");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

var autoFocusElem = document.getElementById("url");
setTimeout(() => { autoFocusElem.autofocus = true }, 500);