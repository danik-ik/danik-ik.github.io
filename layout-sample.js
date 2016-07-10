var USE_HTML_FILE = false; // В этом режиме пытаемся загрузить файл layout-sample.htm
var theSample = '<div class="sample">\n  <div>\n    <div class="switch">\n      <input type="checkbox" id="visibilitySwitch" onclick="sampleSwitch()">\n    </div>\n  </div>\n  <img src="layout-sample.png" id="sampleImage">\n</div>\n';
if (USE_HTML_FILE) 
	theSample = '<h2>can\'t load layout-sample.htm, const used</h2>' + theSample;

if (!USE_HTML_FILE) {
	useTheSample(theSample);
} else {
	var request = new XMLHttpRequest();
	request.open('GET', './layout-sample.htm', true);

	request.onload = function () {
		if (request.readyState === 4) {
			// Проверяем успешность GET-запроса
			if (request.status === 200) {
				useTheSample(request.responseText);
			} else {
				console.error(request.statusText);
				useTheSample(theSample);
			}
		}
	};

// Ловим ошибки

	request.onerror = function () {
		console.error(request.statusText);
		useTheSample(theSample);
	};

	request.send(null);
}

function useTheSample(sample) {
	var l = document.createElement('LINK');
	l.rel = 'stylesheet';
	l.href = './layout-sample.css';
	l.media = 'all';
	document.getElementsByTagName('head')[0].appendChild(l);

	var div = document.createElement('div');
	div.className = "sample";
	div.innerHTML = sample;

	document.body.appendChild(div);
}
function sampleSwitch() {
	sampleImage = document.getElementById('sampleImage');
	sampleImage.style.visibility = document.getElementById('visibilitySwitch').checked ? 'visible' : 'hidden';
}
