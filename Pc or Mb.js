function browserRedirect() {
				var sUserAgent = navigator.userAgent.toLowerCase();
				var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
				var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
				var bIsMidp = sUserAgent.match(/midp/i) == "midp";
				var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
				var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
				var bIsAndroid = sUserAgent.match(/android/i) == "android";
				var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
				var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
				if(!(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM)) {
					window.location.href = 'al_web.html';
				} else {}
			}
			browserRedirect();
			var phoneWidth = parseInt(window.screen.width);
			if(phoneWidth < 321) {
				document.write('<style type="text/css">body{font-size: 14px;}</style>');
			} else {
				document.write('<style type="text/css">body{font-size: 16px;}</style>');
			}